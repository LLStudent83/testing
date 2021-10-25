/* eslint-disable no-unused-vars */
import FormaValidCard from './formaValidCard';

const containerEl = document.querySelector('.container');
const inputEl = document.querySelector('.input-valid-card');
const buttonEl = document.querySelector('.to-valid');
const formaValidCard = new FormaValidCard(containerEl, inputEl, buttonEl);
