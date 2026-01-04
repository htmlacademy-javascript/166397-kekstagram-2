const ALERT_SHOW_TIME = 5000;
const bodyElement = document.querySelector('body');
let isFormOpen = false;

const setFormState = () => {
  isFormOpen = !isFormOpen;
};

const getFormState = () => isFormOpen;

const isSendInfoModalExist = () => bodyElement.querySelector('.error') || bodyElement.querySelector('.success');

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


export { findTemplateById, isEscKey, findElementById, showAlertTemporarily, isSendInfoModalExist, getFormState, setFormState };
