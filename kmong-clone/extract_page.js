const { chromium } = require('playwright');
const fs = require('fs');

async function extractHTMLAndCSS() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://kmong.com/signup?next_page=%2F');
  await page.waitForLoadState('networkidle');
  
  // 1. HTML 구조
  const html = await page.content();
  
  // 2. 모든 CSS 추출
  const allCSS = await page.evaluate(() => {
    // 외부 CSS 파일 내용
    const externalCSS = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return ''; // CORS 제한으로 접근 불가한 CSS
        }
      })
      .join('\n');
    
    // 인라인 CSS
    const inlineCSS = Array.from(document.querySelectorAll('style'))
      .map(style => style.textContent)
      .join('\n');
    
    return externalCSS + '\n' + inlineCSS;
  });
  
  fs.writeFileSync('kmong.html', html);
  fs.writeFileSync('kmong.css', allCSS);
  
  await browser.close();
}

extractHTMLAndCSS();