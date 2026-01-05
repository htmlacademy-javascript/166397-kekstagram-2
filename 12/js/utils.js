const ALERT_SHOW_TIME = 5000;
const DEFAULT_TIMEOUT_DELAY = 500;
const bodyElement = document.querySelector('body');
let isFormOpen = false;

const setFormState = () => {
  isFormOpen = !isFormOpen;
};

const getFormState = () => isFormOpen;

const checkSendInfoModalExist = () => bodyElement.querySelector('.error') || bodyElement.querySelector('.success');

const findTemplateById = (id) => {
  const template = bodyElement.querySelector(`#${id}`);

  if (!template) {
    throw new Error('Element not found');
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('Element in not a template');
  }

  return template.content.firstElementChild;
};

const isEscKey = (evt) => evt.key === 'Escape';

const findElementById = (id, array) => array.find((element) => element.id === id);

const errorTemplateElement = findTemplateById('data-error');

const showAlertTemporarily = (message) => {
  const errorElement = errorTemplateElement.cloneNode(true);

  if (message) {
    errorElement.querySelector('.data-error__title').textContnet = message;
  }

  bodyElement.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const getPluralForm = (number, formForOne, formForFew, formForMany) => {
  const lastTwoDigits = Math.abs(number) % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return formForMany;
  }

  if (lastDigit === 1) {
    return formForOne;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return formForFew;
  }

  return formForMany;
};

function debounce (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  findTemplateById,
  isEscKey,
  findElementById,
  showAlertTemporarily,
  checkSendInfoModalExist,
  getFormState,
  setFormState,
  getPluralForm,
  debounce
};
