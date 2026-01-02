const ALERT_SHOW_TIME = 5000;
const bodyElement = document.querySelector('body');

const findTemplateById = (id) => {
  const template = document.querySelector(`#${id}`);

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

const showAlertTemporarily = (template, message) => {
  const templateElement = template.cloneNode(true);

  if (message) {
    templateElement.querySelector('.data-error__title').textContnet = message;
  }

  bodyElement.append(templateElement);

  setTimeout(() => {
    templateElement.remove();
  }, ALERT_SHOW_TIME);
};


export { findTemplateById, isEscKey, findElementById, showAlertTemporarily };
