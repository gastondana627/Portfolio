import asyncio
from playwright.async_api import async_playwright
import os

async def verify_graph():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        await page.evaluate("document.getElementById('graph-container').scrollIntoView()")
        await asyncio.sleep(5)

        container = await page.query_selector("#graph-container")
        box = await container.bounding_box()

        center_x = box['x'] + box['width'] / 2
        center_y = box['y'] + box['height'] / 2

        print(f"Moving mouse to center ({center_x}, {center_y})")
        await page.mouse.move(center_x, center_y)
        await asyncio.sleep(1)

        print(f"Clicking at ({center_x}, {center_y})")
        await page.mouse.click(center_x, center_y)
        await asyncio.sleep(2)

        chatbot_active = await page.evaluate("document.getElementById('chatbot-overlay').classList.contains('active')")
        print(f"Chatbot active after click: {chatbot_active}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_graph())
