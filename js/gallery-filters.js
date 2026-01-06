import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './utils.js';

const TIMEOUT_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;
const BUTTON_CLASS = 'img-filters__button';
const ACTIVE_BUTTON_CLASS = `${BUTTON_CLASS}--active`;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
let processedPhotos = [];

const imageFiltersElement = document.querySelector('.img-filters');
const imageFiltersButtonsElements = imageFiltersElement.querySelectorAll(`.${BUTTON_CLASS}`);

const debounceRenderThumbnails = debounce(renderThumbnails, TIMEOUT_DELAY);

const changeActiveButton = (targetButton) => {
  imageFiltersButtonsElements.forEach((button) => {
    button.classList.remove(ACTIVE_BUTTON_CLASS);
  });
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);
};

const initFilters = (photos) => {
  imageFiltersElement.classList.remove('img-filters--inactive');

  imageFiltersElement.addEventListener('click', (evt) => {
    const targetButtonElement = evt.target.closest(`.${BUTTON_CLASS}`);

    if (targetButtonElement) {
      if (targetButtonElement.classList.contains(ACTIVE_BUTTON_CLASS)) {
        return;
      }

      changeActiveButton(targetButtonElement);

      const targetFilter = targetButtonElement.id;

      switch (targetFilter) {
        case Filters.DEFAULT:
          processedPhotos = photos;
          break;
        case Filters.RANDOM:
          processedPhotos = photos.slice().sort(() => Math.random() * 2 - 1).slice(0, RANDOM_PHOTOS_COUNT);
          break;
        case Filters.DISCUSSED:
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
