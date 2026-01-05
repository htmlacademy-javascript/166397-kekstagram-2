import { isEscKey, checkSendInfoModalExist, setFormState } from './utils.js';
import { renderSendInfoModal } from './send-info-modal.js';
import { isFormValid, resetValidation } from './form-validation.js';
import { initScalePhoto, resetScaleValue } from './scale-photo.js';
import { initPhotoFilters, resetPhotoFilters } from './photo-filters.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const modalFormElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const modalFormCloseElement = modalFormElement.querySelector('.img-upload__cancel');
const sliderWrapperElement = modalFormElement.querySelector('.img-upload__effect-level');
const submitButtonElement = modalFormElement.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    const isSendInfoModalExist = checkSendInfoModalExist();
    if (evt.target.matches('.text__description') || evt.target.matches('.text__hashtags') || isSendInfoModalExist) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      closeModalForm();
    }
  }
};

const toggleSubmitButton = (isDisabled, text) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = text;
};

function openModalForm() {
  setFormState();
  modalFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  sliderWrapperElement.classList.add('hidden');
}

function closeModalForm() {
  setFormState();
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

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isFormValid()) {
      const formData = new FormData(evt.target);
      toggleSubmitButton(true, SubmitButtonText.SENDING);
      sendData(formData).then(() => {
        closeModalForm();
        renderSendInfoModal('success');
      }).catch(() => {
        renderSendInfoModal('error');
      }).finally(() => {
        toggleSubmitButton(false, SubmitButtonText.IDLE);
      });
    }
  });

  uploadControlElement.addEventListener('change', () => {
    openModalForm();
  });

  modalFormCloseElement.addEventListener('click', () => {
    closeModalForm();
  });

  initScalePhoto();
  initPhotoFilters();
};

export { initModalForm };
