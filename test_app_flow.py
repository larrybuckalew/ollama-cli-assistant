import asyncio
import re
from playwright.async_api import async_playwright, expect

# --- Test Configuration ---
BASE_URL = "http://localhost:3000"
# Generate a unique email for each test run to avoid conflicts
TEST_EMAIL = f"testuser_{int(asyncio.run(asyncio.sleep(0, result=1000 * asyncio.get_event_loop().time())))}@example.com"
TEST_PASSWORD = "password123"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, slow_mo=500) # Use headless=False to watch the test run
        page = await browser.new_page()

        print("--- 1. Running Test: User Registration ---")
        await page.goto(f"{BASE_URL}/register")
        await page.get_by_label("Email").fill(TEST_EMAIL)
        await page.get_by_label("Password", exact=True).fill(TEST_PASSWORD)
        await page.get_by_label("Confirm Password", exact=True).fill(TEST_PASSWORD)
        await page.get_by_role("button", name="Start Free Trial").click()
        
        success_message = page.locator("text=Registration successful!")
        await expect(success_message).to_be_visible()
        print("✅ Registration successful!")
        await asyncio.sleep(2)

        print("\n--- 2. Running Test: Login & Logout ---")
        await page.get_by_role("link", name="Log In").click()
        
        await expect(page).to_have_url(re.compile(".*login"))
        print("  - On login page")

        await page.get_by_label("Email").fill(TEST_EMAIL)
        await page.get_by_label("Password").fill(TEST_PASSWORD)
        await page.get_by_role("button", name="Log In").click()

        dashboard_button = page.get_by_role("button", name="Dashboard")
        await expect(dashboard_button).to_be_visible()
        print("  - Login successful, dashboard button is visible.")
        
        await page.get_by_role("button", name="Logout").click()
        login_button = page.get_by_role("link", name="Log In")
        await expect(login_button).to_be_visible()
        print("  - Logout successful, login button is visible.")
        await asyncio.sleep(2)

        print("\n--- 3. Running Test: Protected Dashboard Route ---")
        print("  - Attempting to access dashboard when logged out...")
        await page.goto(f"{BASE_URL}/dashboard")
        await expect(page).to_have_url(re.compile(".*login"))
        print("  - Correctly redirected to login page.")

        print("  - Logging in to test protected access...")
        await page.get_by_label("Email").fill(TEST_EMAIL)
        await page.get_by_label("Password").fill(TEST_PASSWORD)
        await page.get_by_role("button", name="Log In").click()
        
        await expect(page.get_by_role("button", name="Dashboard")).to_be_visible()
        await page.goto(f"{BASE_URL}/dashboard")
        
        dashboard_heading = page.get_by_role("heading", name="Welcome to your Dashboard")
        await expect(dashboard_heading).to_be_visible()
        print("  - Successfully accessed dashboard when logged in.")
        await asyncio.sleep(2)

        print("\n--- 4. Running Test: Stripe Checkout Redirect ---")
        await page.goto(f"{BASE_URL}/models")
        
        # Click the first "Purchase" button on the page
        purchase_button = page.get_by_role("button", name="Purchase").first
        await purchase_button.click()
        
        print("  - Waiting for redirect to Stripe...")
        await page.wait_for_url("https://checkout.stripe.com/**", timeout=15000)
        await expect(page).to_have_url(re.compile(".*checkout.stripe.com.*"))
        print("  - Successfully redirected to Stripe Checkout!")
        await asyncio.sleep(2)

        print("\n--- All tests passed! ---")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
