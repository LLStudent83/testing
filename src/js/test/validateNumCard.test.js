import checkValidInput from '../testNumberCard';

test('проверка валидации валидного номера карты', () => {
  checkValidInput('2221004624178068');
  expect(checkValidInput('2221004624178068')).toBeTruthy();
});

test('проверка валидации не валидного номера карты', () => {
  checkValidInput('2221004624178068');
  expect(checkValidInput('222100462417806')).toBeFalsy();
});
