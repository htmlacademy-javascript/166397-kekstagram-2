const EffectsMap = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const EffectsSettings = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 1,
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  }
};

const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderWrapperElement.querySelector('.effect-level__slider');
const effectFieldElement = sliderWrapperElement.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.img-upload__effects');
const imageElement = document.querySelector('.img-upload__preview img');

let currentFilter = '';

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectFieldElement.value = `${sliderValue}`;

  const propertyValue = `${EffectsMap[currentFilter]}(${sliderValue}${currentFilter === 'marvin' ? '%' : ''}${currentFilter === 'phobos' ? 'px' : ''})`;

  imageElement.style.filter = `${propertyValue}`;
};

const onEffectsListChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentFilter = evt.target.value;

    if (currentFilter === 'none') {
      sliderWrapperElement.classList.add('hidden');
      imageElement.style.filter = currentFilter;
    } else {
      sliderWrapperElement.classList.remove('hidden');

      sliderElement.noUiSlider.updateOptions({
        ...EffectsSettings[currentFilter],
      });

      sliderElement.noUiSlider.set(EffectsSettings[currentFilter].max);
    }
  }
};

const initPhotoFilters = () => {
  createSlider();
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  effectsListElement.addEventListener('change', onEffectsListChange);
};
const resetPhotoFilters = () => {
  imageElement.removeAttribute('style');
};

export { initPhotoFilters, resetPhotoFilters };
