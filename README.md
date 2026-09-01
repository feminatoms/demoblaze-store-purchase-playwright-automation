# Store Purchase Automation — Playwright + JavaScript
End-to-end UI automation framework for a demo e-commerce storefront, 
built to practice production-style test automation patterns using Playwright.

## What it tests
- User signup and login (including invalid/negative login scenarios)
- Product browsing and product summary details
- Add to cart and cart summary
- Checkout flow, including form fill and order placement confirmation

## Tech stack
- Playwright (JavaScript)
- Page Object Model (POM) architecture
- JSON-driven test data
- GitHub Actions CI/CD (runs the suite automatically via `.github/workflows/playwright.yml`)

## Project structure
'''
page_objects/ → Page Object classes (HomeScreen, Login, Signup, Product_Summary, CartSummary_Checkout, POManager)
tests/ → Test specs (StorePurchase, StorePurchaseObject)
Util/ → Test data and helper utilities
playwright.config.js
'''

## Running the tests
'''
npm install
npx playwright test
npx playwright show-report
'''

## Status
10/10 tests passing.

## About this project
This is a personal, self-directed automation project built to apply hands-on
Playwright training to a realistic end-to-end purchase flow. It is not
professional/client work.


