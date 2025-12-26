const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const isHashtagValid = (value) => hashtag.test(value);

const isEveryHashtagValid = (hashtags) => hashtags.every((item) => isHashtagValid(item));

const isHashtagsCountValid = (hashtags) => hashtags.length <= MAX_HASHTAGS_COUNT;

const isHashtagsUnique = (hashtags) => new Set(hashtags).size === hashtags.length;

const validateHashtagsField = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  return isEveryHashtagValid(hashtags) && isHashtagsCountValid(hashtags) && isHashtagsUnique(hashtags);
};

const validateDescriptionField = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const getHashtagsErrorMessage = (value) => {
  const hashtags = value.trim().split(/\s+/);

  if (!isEveryHashtagValid(hashtags)) {
    return 'Невалидный хэштег';
  }

  if (!isHashtagsUnique(hashtags)) {
    return 'Хэштеги повторяются';
  }

  if (!isHashtagsCountValid(hashtags)) {
    return 'Не более 5 хэштегов';
  }
};

pristine.addValidator(hashtagsFieldElement, validateHashtagsField, getHashtagsErrorMessage);
pristine.addValidator(descriptionFieldElement, validateDescriptionField, 'Не больше 140 символов');

const initFormValidation = () => {
  if (!formElement) {
    return;
  }

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      formElement.submit();
    }
  });
};

export { initFormValidation };
