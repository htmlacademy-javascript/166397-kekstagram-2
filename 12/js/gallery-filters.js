import { renderThumbnails } from './render-thumbnails';
import { debounce } from './utils';

const TIMEOUT_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;
let processedPhotos = [];

const imageFiltersElement = document.querySelector('.img-filters');
const imageFiltersButtonsElements = imageFiltersElement.querySelectorAll('.img-filters__button');

const debounceRenderThumbnails = debounce(renderThumbnails, TIMEOUT_DELAY);

const changeActiveButton = (targetButton) => {
  imageFiltersButtonsElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  targetButton.classList.add('img-filters__button--active');
};

const initFilters = (photos) => {
  imageFiltersElement.classList.remove('img-filters--inactive');

  imageFiltersElement.addEventListener('click', (evt) => {
    const targetButtonElement = evt.target.closest('.img-filters__button');

    if (targetButtonElement) {
      if (targetButtonElement.classList.contains('img-filters__button--active')) {
        return;
      }

      changeActiveButton(targetButtonElement);

      const targetID = targetButtonElement.id;

      switch (targetID) {
        case 'filter-default':
          processedPhotos = photos;
          break;
        case 'filter-random':
          processedPhotos = photos.slice().sort(() => Math.random() * 2 - 1).slice(0, RANDOM_PHOTOS_COUNT);
          break;
        case 'filter-discussed':
          processedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
          break;
        default:
          processedPhotos = photos;
      }

      debounceRenderThumbnails(processedPhotos);
    }
  });
};

export { initFilters };
