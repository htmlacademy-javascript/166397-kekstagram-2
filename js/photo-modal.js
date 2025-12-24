import { findPhotoById, isEscKey } from './utils.js';
import { createRenderNextComments } from './render-comments.js';

const COMMENTS_CHUNK_SIZE = 5;
const COMMENTS_INDEX_START = 0;

const bodyElement = document.querySelector('body');
const modalElement = bodyElement.querySelector('.big-picture');
const modalImageElement = modalElement.querySelector('.big-picture__img img');
const modalLikesElement = modalElement.querySelector('.likes-count');
const closeModalElement = modalElement.querySelector('.big-picture__cancel');
const modalCommentsCountElement = modalElement.querySelector('.social__comment-count');
const modalShownCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-shown-count');
const modalTotalCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-total-count');
const modalDescriptionElement = modalElement.querySelector('.social__caption');
const modalCommentsListElement = modalElement.querySelector('.social__comments');
const modalCommentsListChildren = modalCommentsListElement.children;
const modalCommentsLoaderElement = modalElement.querySelector('.comments-loader');

let onLoaderClick;

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const renderBigPhoto = ({url, likes, comments, description}) => {
  modalImageElement.src = url;
  modalLikesElement.textContent = likes;
  modalShownCommentsCountElement.textContent = comments.length < COMMENTS_CHUNK_SIZE ? comments.length : COMMENTS_CHUNK_SIZE;
  modalTotalCommentsCountElement.textContent = comments.length;
  modalDescriptionElement.textContent = description;

  if (COMMENTS_CHUNK_SIZE >= comments.length) {
    modalCommentsLoaderElement.classList.add('hidden');
  } else {
    modalCommentsLoaderElement.classList.remove('hidden');
  }
};

function openPhotoModal(photo) {
  modalElement.classList.remove('hidden');
  const comments = photo.comments;
  const renderNextComments = createRenderNextComments(COMMENTS_INDEX_START, COMMENTS_CHUNK_SIZE, comments, modalCommentsListElement);

  modalCommentsListElement.innerHTML = '';
  renderNextComments();

  renderBigPhoto(photo);

  onLoaderClick = () => {
    renderNextComments();

    modalShownCommentsCountElement.textContent = modalCommentsListChildren.length;

    if (modalCommentsListChildren.length >= comments.length) {
      modalCommentsLoaderElement.classList.add('hidden');
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.add('modal-open');
  modalCommentsLoaderElement.addEventListener('click', onLoaderClick);
}

function closePhotoModal() {
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
  modalCommentsLoaderElement.removeEventListener('click', onLoaderClick);
}

const initPhotoModal = (photos, container) => {
  if (!modalElement) {
    return;
  }

  container.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      const targetThumbnailElement = evt.target.closest('.picture');
      const targetThumbnailElementId = Number(targetThumbnailElement.dataset.id);
      const targetPhoto = findPhotoById(targetThumbnailElementId, photos);

      openPhotoModal(targetPhoto);
    }
  });

  closeModalElement.addEventListener('click', () => {
    closePhotoModal();
  });
};

export { initPhotoModal };
