import { isEscKey } from './utils.js';
import { initFormValidation } from './form-validation.js';

const bodyElement = document.querySelector('body');
const formElemet = bodyElement.querySelector('.img-upload__form');
const modalFormElement = formElemet.querySelector('.img-upload__overlay');
const uploadControlElement = formElemet.querySelector('.img-upload__input');
const modalFormCloseElement = modalFormElement.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    if (evt.target.matches('.text__description')) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      closeModalForm();
    }
  }
};

function openModalForm() {
  modalFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModalForm() {
  modalFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElemet.reset();
}

const initModalForm = () => {
  if (!modalFormElement) {
    return;
  }

  uploadControlElement.addEventListener('change', () => {
    openModalForm();
  });

  modalFormCloseElement.addEventListener('click', () => {
    closeModalForm();
  });

  initFormValidation();
};

export { initModalForm };
