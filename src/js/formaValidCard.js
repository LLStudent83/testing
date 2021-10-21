/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
export default class FormaValidCard {
  constructor() {
    this.containerEl = document.querySelector('.container');
    this.inputEl = document.querySelector('.input-valid-card');
    this.buttonEl = document.querySelector('.to-valid');
    this.init();
    this.cardIdentifiers = [{ mir: [2] },
      { american_express: [34, 37] },
      { mastercard: [51, 52, 53, 54, 55] },
      { visa: [4] },
      { discover: [60] },
      { jcb: [31, 35] },
      { diners: [30, 36, 38] },
    ];
  }

  init() {
    this.inputEl.addEventListener('input', (event) => this.checkValidInputNum(event));
    this.buttonEl.addEventListener('click', () => this.checkValidInput());
  }

  checkValidInputNum(event) { // проверяет что бы каждое введенное значение было числом
    const previousValue = this.inputEl.value;
    if (!/^\d*$/.test(this.inputEl.value)) {
      const position = previousValue.indexOf(event.data) + 1;
      this.inputEl.value = previousValue.substring(0, position - 1)
      + previousValue.substring(position, previousValue.length);
      if (event.data === null) {
        this.inputEl.value = '';
      }
      alert('В поле валидации нужно вводить только цифры');
      return false;
    }
    return true;
  }

  checkValidInput() { // проверяет правильность введенного номера карты
    const numCard = this.inputEl.value;
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
      this.identifyAffiliationCard(numCard);
    } else alert('Вы ввели неверный номер карты');
  }

  identifyAffiliationCard(numCard) { // определяет какой системе принадлежит карта
    // const numCard = this.inputEl.value;
    this.cardIdentifiers.forEach((elem) => {
      // eslint-disable-next-line guard-for-in
      for (const obj in elem) {
        elem[obj].forEach((elemObj) => {
          const test = new RegExp(`^${elemObj}`).test(numCard);
          if (test) {
            this.showAffiliationCard(obj);
          }
        });
      }
    });
  }

  showAffiliationCard(nameCard) { // подсвечивает иконку системы карты
    const elemCards = document.querySelectorAll('.image-card');
    elemCards.forEach((elem) => elem.classList.add('mask'));
    const actevCard = document.querySelector(`.${nameCard}`);
    actevCard.classList.remove('mask');
  }
}
