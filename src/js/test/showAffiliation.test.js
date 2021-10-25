/**
 * @jest-environment jsdom
 */

/* eslint-disable no-unused-vars */

import FormaValidCard from '../formaValidCard';

const puppetteer = require('puppeteer');

jest.setTimeout(30000);
describe('Check сard', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show guis
      lowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });
  describe('Check сard', () => {
    // test('проверка метода checkValidInput', async () => {
    //   await page.goto(baseUrl);
    //   const formaValidCard = await new FormaValidCard();
    //   // const result = formaValidCard.checkValidInput('2221004624178068');
    //   expect(formaValidCard.checkValidInput('2221004624178068'))
    //     .toBe(formaValidCard.identifyAffiliationCard);
    // });
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
