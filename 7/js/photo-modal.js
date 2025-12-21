import { isEscKey } from './utils';
import { renderBigPhoto } from './render-photo';

const bodyElement = document.querySelector('body');
const modalElement = bodyElement.querySelector('.big-picture');
const closeModalElement = modalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePhotoModal();
  }
};

function openPhotoModal(id, photos) {
  modalElement.classList.remove('hidden');
  renderBigPhoto(id, photos);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.add('modal-open');
}

function closePhotoModal() {
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
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

  closeModalElement.addEventListener('click', closePhotoModal);
};

export { initPhotoModal };
