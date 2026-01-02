import { findElementById } from './utils.js';
import { showAlertTemporarily, findTemplateById } from './utils.js';
import { renderThumbnails } from './render-thumbnails.js';
import { registerPhotoModalEvents, openPhotoModal } from './photo-modal.js';
import { getData } from './api.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

const errorTemplateElement = findTemplateById('data-error');

const initGallery = () => {
  getData().then((photos) => {
    renderThumbnails(photos, thumbnailsContainerElement);
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
  }).catch(() => {
    showAlertTemporarily(errorTemplateElement);
  });

};

export { initGallery };

