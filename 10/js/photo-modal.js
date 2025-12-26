import { findElementById, isEscKey } from './utils.js';
import { renderComments } from './render-comments.js';

const COMMENTS_CHUNK_SIZE = 5;
let startIndex = 0;
let comments = [];

const bodyElement = document.querySelector('body');
const modalElement = bodyElement.querySelector('.big-picture');
const modalImageElement = modalElement.querySelector('.big-picture__img img');
const modalLikesElement = modalElement.querySelector('.likes-count');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');
const modalCommentsCountElement = modalElement.querySelector('.social__comment-count');
const modalShownCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-shown-count');
const modalTotalCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-total-count');
const modalDescriptionElement = modalElement.querySelector('.social__caption');
const modalCommentsListElement = modalElement.querySelector('.social__comments');
const modalCommentsLoaderElement = modalElement.querySelector('.comments-loader');

const renderNextComments = () => {
  const endIndex = startIndex + COMMENTS_CHUNK_SIZE;
  const safeEndIndex = Math.min(endIndex, comments.length);
  const sliceComments = comments.slice(startIndex, safeEndIndex);

  renderComments(sliceComments, modalCommentsListElement);

  modalShownCommentsCountElement.textContent = safeEndIndex;

  modalCommentsLoaderElement.classList.toggle('hidden', safeEndIndex >= comments.length);

  startIndex += COMMENTS_CHUNK_SIZE;
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const renderBigPhoto = ({url, likes, description}) => {
  modalImageElement.src = url;
  modalLikesElement.textContent = likes;
  modalTotalCommentsCountElement.textContent = comments.length;
  modalDescriptionElement.textContent = description;
};

function openPhotoModal(photo) {
  modalElement.classList.remove('hidden');
  comments = photo.comments;

  modalCommentsListElement.innerHTML = '';
  renderNextComments();

  renderBigPhoto(photo);

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.add('modal-open');
}

function closePhotoModal() {
  startIndex = 0;
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
}

const initPhotoModal = (photos, container) => {
  if (!modalElement) {
    return;
  }

  container.addEventListener('click', (evt) => {
    const targetThumbnailElement = evt.target.closest('.picture');

    if (targetThumbnailElement) {
      evt.preventDefault();

      const targetThumbnailElementId = Number(targetThumbnailElement.dataset.id);
      const targetPhoto = findElementById(targetThumbnailElementId, photos);

      openPhotoModal(targetPhoto);
    }
  });

  modalCommentsLoaderElement.addEventListener('click', () => {
    renderNextComments();
  });

  modalCloseElement.addEventListener('click', () => {
    closePhotoModal();
  });
};

export { initPhotoModal };
