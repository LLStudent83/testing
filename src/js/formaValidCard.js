/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */

import checkValidInput from './testNumberCard';

export default class FormaValidCard {
  constructor(container, input, button) {
    this.containerEl = container;
    this.inputEl = input;
    this.buttonEl = button;
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
    if (this.containerEl === null) return;
    this.inputEl.addEventListener('input', (event) => this.checkValidInputNum(event));
    this.buttonEl.addEventListener('click', () => this.checkValidNumCard(this.inputEl.value));
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

  checkValidNumCard(numCard) { // проверяет правильность введенного номера карты
    if (checkValidInput(numCard)) {
      this.identifyAffiliationCard(numCard);
    } else alert('Вы ввели неверный номер карты');
  }

  identifyAffiliationCard(numCard) { // определяет какой системе принадлежит карта
    this.cardIdentifiers.forEach((elem) => {
      // eslint-disable-next-line guard-for-in
      for (const data in elem) {
        elem[data].forEach((elemObj) => {
          const test = new RegExp(`^${elemObj}`).test(numCard);
          if (test) {
            this.showAffiliationCard(data);
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
    actevCard.classList.add('acktiv');
  }
}
