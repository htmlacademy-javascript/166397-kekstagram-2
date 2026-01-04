import { isEscKey, findTemplateById, getFormState } from './utils.js';

const VALID_STATUSES = ['success', 'error'];

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

const createSendInfoModal = (template, message) => {
  const templateModalElement = template.cloneNode(true);
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
  if (!VALID_STATUSES.includes(status)) {
    return;
  }

  currentStatus = status;
  modalElement = createSendInfoModal(currentStatus === 'success' ? successTemplateElement : errorTemplateElement, message);
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
