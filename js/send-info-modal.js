import { isEscKey, findTemplateById, getFormState } from './utils.js';

const bodyElement = document.querySelector('body');
const errorTemplateElement = findTemplateById('error');
const successTemplateElement = findTemplateById('success');

let modalElement;
let currentStatus;

const onModalClick = (evt) => {
  if (!evt.target.closest(`.${currentStatus}__inner`)) {
    removeSendInfoModal();
  }
};

const onBodyKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    removeSendInfoModal();
  }
};

const createSendInfoModal = (message) => {
  const templateElement = currentStatus === 'success' ? successTemplateElement : errorTemplateElement;
  const templateModalElement = templateElement.cloneNode(true);
  const closeElement = templateModalElement.querySelector(`.${currentStatus}__button`);

  if (message) {
    templateModalElement.querySelector(`.${currentStatus}__title`).textContnet = message;
  }

  closeElement.addEventListener('click', () => {
    removeSendInfoModal();
  });

  return templateModalElement;
};

function renderSendInfoModal(status, message) {
  if (status !== 'success' && status !== 'error') {
    throw new Error('Неизвестный статус сообщения');
  }

  currentStatus = status;
  modalElement = createSendInfoModal(message);
  bodyElement.append(modalElement);
  document.addEventListener('keydown', onBodyKeydown);
  modalElement.addEventListener('click', onModalClick);
  bodyElement.classList.add('modal-open');
}

function removeSendInfoModal() {
  modalElement.remove();
  document.removeEventListener('keydown', onBodyKeydown);

  const isFormOpen = getFormState();
  if (!isFormOpen) {
    bodyElement.classList.remove('modal-open');
  }
}

export { renderSendInfoModal };
