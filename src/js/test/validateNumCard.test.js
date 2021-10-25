import checkValidInput from '../testNumberCard';

test('проверка валидации номера карты', () => {
  checkValidInput('2221004624178068');
  expect(checkValidInput('2221004624178068')).toBeTruthy();
  expect(checkValidInput('222100462417806')).toBeFalsy();
});
