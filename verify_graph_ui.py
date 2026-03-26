import asyncio
from playwright.async_api import async_playwright
import os

async def verify_graph_ui():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        await page.evaluate("document.getElementById('graph-container').scrollIntoView()")
        await asyncio.sleep(2)

        # Check UI elements
        header_visible = await page.is_visible(".graph-header")
        controls_visible = await page.is_visible(".graph-controls")
        print(f"Graph Header visible: {header_visible}")
        print(f"Graph Controls visible: {controls_visible}")

        await page.screenshot(path="graph_ui_verification.png")

        # Test orbit toggle
        orbit_active_before = await page.evaluate("document.getElementById('toggle-orbit').classList.contains('active')")
        print(f"Orbit active before: {orbit_active_before}")

        await page.click("#toggle-orbit")
        await asyncio.sleep(0.5)

        orbit_active_after = await page.evaluate("document.getElementById('toggle-orbit').classList.contains('active')")
        print(f"Orbit active after: {orbit_active_after}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_graph_ui())
