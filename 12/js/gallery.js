import { findElementById } from './utils.js';
import { renderThumbnails } from './render-thumbnails.js';
import { registerPhotoModalEvents, openPhotoModal } from './photo-modal.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

const initGallery = (photos) => {
  renderThumbnails(photos);
  registerPhotoModalEvents();

  thumbnailsContainerElement.addEventListener('click', (evt) => {
    const targetThumbnailElement = evt.target.closest('.picture');

    if (targetThumbnailElement) {
      evt.preventDefault();

      const targetThumbnailElementId = Number(targetThumbnailElement.dataset.id);
      const targetPhoto = findElementById(targetThumbnailElementId, photos);

      openPhotoModal(targetPhoto);
    }
  });
};

export { initGallery };

