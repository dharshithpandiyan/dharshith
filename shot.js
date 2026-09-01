const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 2000});
  await page.goto('https://surya.signbridge.click', {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'reference.png', fullPage: true});
  await browser.close();
})();
