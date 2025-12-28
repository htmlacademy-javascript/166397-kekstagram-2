import { isEscKey } from './utils.js';
import { initFormValidation, resetValidation } from './form-validation.js';
import { initScalePhoto, resetScaleValue } from './scale-photo.js';
import { initPhotoFilters, resetPhotoFilters } from './photo-filters.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const modalFormElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const modalFormCloseElement = modalFormElement.querySelector('.img-upload__cancel');
const sliderWrapperElement = modalFormElement.querySelector('.img-upload__effect-level');

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    if (evt.target.matches('.text__description') || evt.target.matches('.text__hashtags')) {
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
  sliderWrapperElement.classList.add('hidden');
}

function closeModalForm() {
  modalFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  resetPhotoFilters();
  resetScaleValue();
  resetValidation();
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
  initScalePhoto();
  initPhotoFilters();
};

export { initModalForm };
