import { renderThumbnails } from './render-thumbnails.js';
import { createPhotos } from './create-photos.js';
import { initPhotoModal } from './photo-modal.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

const photos = createPhotos();

const initGallery = () => {
  renderThumbnails(photos, thumbnailsContainerElement);
  initPhotoModal(photos, thumbnailsContainerElement);
};

export { initGallery };

