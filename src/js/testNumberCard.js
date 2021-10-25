/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

export default function checkValidInput(numCard) { // проверяет правильность введенного номера карты
  const numLength = numCard.length;
  const checkNumber = Number(numCard.substring(numLength - 1)); // контрольное число
  const numberArr = numCard.substring(0, numLength - 1).split('');
  const j = numberArr.reverse()
    .map((elem) => Number(elem));
  const checkSumm = j.reduce((total, value, index) => {
    if (index % 2 === 0) {
      value *= 2;
      if (value > 9) {
        value -= 9;
        return total + value;
      } return total + value;
    }
    return total + value;
  }, 0);
  const validity = checkNumber === (10 - (checkSumm % 10));
  if (validity) {
    return true;
  } return false;
}
