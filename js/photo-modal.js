import { findPhotoById, isEscKey } from './utils.js';
import { createRenderNextComments } from './render-comments.js';
import { renderBigPhoto } from './render-big-photo.js';

const COMMENTS_CHUNK_SIZE = 5;
const COMMENTS_INDEX_START = 0;

const bodyElement = document.querySelector('body');
const modalElement = bodyElement.querySelector('.big-picture');
const closeModalElement = modalElement.querySelector('.big-picture__cancel');
const modalCommentsCountElement = modalElement.querySelector('.social__comment-count');
const modalShownCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-shown-count');
const modalCommentsListElement = modalElement.querySelector('.social__comments');
const modalCommentsListChildren = modalCommentsListElement.children;
const modalCommentsLoaderElement = modalElement.querySelector('.comments-loader');

let onLoaderClick;

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePhotoModal();
  }
};

function openPhotoModal(id, photos) {
  modalElement.classList.remove('hidden');

  const photo = findPhotoById(id, photos);
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

      openPhotoModal(targetThumbnailElementId, photos);
    }
  });

  closeModalElement.addEventListener('click', () => {
    closePhotoModal();
  });
};

export { initPhotoModal };
