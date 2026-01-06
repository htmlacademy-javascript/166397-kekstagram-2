import { getPluralForm } from './utils.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const convertHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const checkHashtagValid = (value) => hashtag.test(value);

const checkEveryHashtagValid = (hashtags) => hashtags.every((item) => checkHashtagValid(item));

const checkHashtagsCountValid = (hashtags) => hashtags.length <= MAX_HASHTAGS_COUNT;

const checkHashtagsUnique = (hashtags) => new Set(hashtags).size === hashtags.length;

let isEveryHashtagValid = true;
let isHashtagsCountValid = true;
let isHashtagsUnique = true;

const validateHashtagsField = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = convertHashtags(value);

  isEveryHashtagValid = checkEveryHashtagValid(hashtags);
  isHashtagsCountValid = checkHashtagsCountValid(hashtags);
  isHashtagsUnique = checkHashtagsUnique(hashtags);

  return isEveryHashtagValid && isHashtagsCountValid && isHashtagsUnique;
};

const validateDescriptionField = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const getHashtagsErrorMessage = () => {
  if (!isEveryHashtagValid) {
    return 'Невалидный хэштег';
  }

  if (!isHashtagsUnique) {
    return 'Хэштеги повторяются';
  }

  if (!isHashtagsCountValid) {
    return `Не более ${MAX_HASHTAGS_COUNT} ${getPluralForm(MAX_HASHTAGS_COUNT, 'хэштегов', 'хэштега', 'хэштегов')}`;
  }
};

const getDescriptionErrorMessage = () => `Не больше ${MAX_DESCRIPTION_LENGTH} ${getPluralForm(MAX_DESCRIPTION_LENGTH, 'символов', 'символа', 'символов')}`;

pristine.addValidator(hashtagsFieldElement, validateHashtagsField, getHashtagsErrorMessage);
pristine.addValidator(descriptionFieldElement, validateDescriptionField, getDescriptionErrorMessage);

const resetValidation = () => {
  pristine.reset();
};

const isFormValid = () => pristine.validate();

export { isFormValid, resetValidation };
