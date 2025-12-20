import { renderThumbnails } from './render-thumbnails.js';
import { createPhotos } from './create-photos.js';

document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails(createPhotos());
});
