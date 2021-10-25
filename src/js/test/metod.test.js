/**
 * @jest-environment jsdom
 */

import FormaValidCard from '../formaValidCard';

test('проверка метода checkValidInput', () => {
  const formaValidCard = new FormaValidCard();
  // const result = formaValidCard.checkValidInput('2221004624178068');
  expect(formaValidCard.checkValidInput('2221004624178068'))
    .toBe(formaValidCard.identifyAffiliationCard);
});
