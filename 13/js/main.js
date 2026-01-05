import { initGallery } from './gallery.js';
import { initModalForm } from './form.js';
import { getData } from './api.js';
import { showAlertTemporarily } from './utils.js';
import { initFilters } from './gallery-filters.js';

document.addEventListener('DOMContentLoaded', () => {
  getData().then((photos) => {
    initGallery(photos);
    initFilters(photos);
  }).catch(() => {
    showAlertTemporarily();
  });

  initModalForm();
});
