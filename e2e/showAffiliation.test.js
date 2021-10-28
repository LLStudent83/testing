import { fork } from 'child_process';

const puppeteer = require('puppeteer');

jest.setTimeout(90000);
describe('Check сard', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: true, // show guis
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  describe('Check сard', () => {
    test('проверка подсвечивания иконки карты', async () => {
      await page.goto(baseUrl);
      const input = await page.$('.input-valid-card');
      await input.type('4716662880185704351');
      const button = await page.$('.to-valid');
      button.click();
      await page.waitForSelector('.acktiv');
    });
  });
});
