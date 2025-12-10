import os
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from authlib.integrations.starlette_client import OAuth
from jose import JWTError, jwt
from datetime import datetime, timedelta

from . import database
from .database import SessionLocal, engine, User

# --- Configuration ---
# IMPORTANT: For production, you should use environment variables for these secrets.
# Do not hardcode them directly in the code.
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "your-google-client-id")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "your-google-client-secret")

MICROSOFT_CLIENT_ID = os.environ.get("MICROSOFT_CLIENT_ID", "your-microsoft-client-id")
MICROSOFT_CLIENT_SECRET = os.environ.get("MICROSOFT_CLIENT_SECRET", "your-microsoft-client-secret")

GITHUB_CLIENT_ID = os.environ.get("GITHUB_CLIENT_ID", "your-github-client-id")
GITHUB_CLIENT_SECRET = os.environ.get("GITHUB_CLIENT_SECRET", "your-github-client-secret")

SECRET_KEY = os.environ.get("SECRET_KEY", "a-very-secret-key-that-you-should-change")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- App Initialization ---
database.create_db_and_tables()
app = FastAPI()

# --- Middleware ---
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- OAuth ---
oauth = OAuth()
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)
oauth.register(
    name='microsoft',
    client_id=MICROSOFT_CLIENT_ID,
    client_secret=MICROSOFT_CLIENT_SECRET,
    server_metadata_url='https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)
oauth.register(
    name='github',
    client_id=GITHUB_CLIENT_ID,
    client_secret=GITHUB_CLIENT_SECRET,
    access_token_url='https://github.com/login/oauth/access_token',
    access_token_params=None,
    authorize_url='https://github.com/login/oauth/authorize',
    authorize_params=None,
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'},
)


# --- Security & JWT ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- Database Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    class Config:
        from_attributes = True

# --- Database Services ---
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

from fastapi.security import OAuth2PasswordRequestForm

# ... (existing code) ...

import stripe

# --- Configuration ---
# ... (existing config)
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "your-stripe-secret-key")
stripe.api_key = STRIPE_SECRET_KEY
# ... (rest of the config)

# ... (existing code) ...

# --- Pydantic Schemas ---
class CheckoutSessionRequest(BaseModel):
    priceId: str

# (duplicate removed)

# --- API Endpoints ---

@app.post("/api/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': request.priceId,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url='http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:3000/cancel',
        )
        return {"url": checkout_session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Ollama CLI Backend is running"}
# ... (rest of endpoints)

@app.post("/api/users/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/users/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)

# ... (existing OAuth endpoints) ...

# Google Auth
@app.get('/auth/google')
async def login_google(request: Request):
    redirect_uri = request.url_for('auth_callback_google')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/callback/google')
async def auth_callback_google(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
    user_info = token.get('userinfo')
    if not user_info:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not fetch user info")

    email = user_info['email']
    db_user = get_user_by_email(db, email=email)

    if not db_user:
        hashed_password = get_password_hash("oauth_user_placeholder_password")
        db_user = User(email=email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    access_token = create_access_token(data={"sub": db_user.email})
    response = RedirectResponse(url=f"/auth/callback?token={access_token}")
    return response

# Microsoft Auth
@app.get('/auth/microsoft')
async def login_microsoft(request: Request):
    redirect_uri = request.url_for('auth_callback_microsoft')
    return await oauth.microsoft.authorize_redirect(request, redirect_uri)

@app.get('/auth/callback/microsoft')
async def auth_callback_microsoft(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.microsoft.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
    user_info = token.get('userinfo')
    if not user_info:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not fetch user info")

    email = user_info['email']
    db_user = get_user_by_email(db, email=email)

    if not db_user:
        hashed_password = get_password_hash("oauth_user_placeholder_password")
        db_user = User(email=email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    access_token = create_access_token(data={"sub": db_user.email})
    response = RedirectResponse(url=f"/auth/callback?token={access_token}")
    return response

# GitHub Auth
@app.get('/auth/github')
async def login_github(request: Request):
    redirect_uri = request.url_for('auth_callback_github')
    return await oauth.github.authorize_redirect(request, redirect_uri)

@app.get('/auth/callback/github')
async def auth_callback_github(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.github.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
    resp = await oauth.github.get('user', token=token)
    user_info = resp.json()

    email = user_info.get('email')
    if not email:
        # If email is private, fetch it from the emails endpoint
        resp_emails = await oauth.github.get('user/emails', token=token)
        emails = resp_emails.json()
        primary_email = next((e['email'] for e in emails if e['primary']), None)
        if not primary_email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not fetch primary email from GitHub")
        email = primary_email

    db_user = get_user_by_email(db, email=email)

    if not db_user:
        hashed_password = get_password_hash("oauth_user_placeholder_password")
        db_user = User(email=email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    access_token = create_access_token(data={"sub": db_user.email})
    response = RedirectResponse(url=f"/auth/callback?token={access_token}")
    return response
