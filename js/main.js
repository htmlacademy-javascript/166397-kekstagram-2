import { initGallery } from './gallery.js';
import { initModalForm } from './form.js';
import { getData } from './api.js';
import { showAlertTemporarily } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  getData().then((photos) => {
    initGallery(photos);
  }).catch(() => {
    showAlertTemporarily();
  });

  initModalForm();
});
