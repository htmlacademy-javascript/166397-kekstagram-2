const STEP = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;

const formElement = document.querySelector('.img-upload__form');
const scaleWrapperElement = formElement.querySelector('.img-upload__scale');
const scaleFieldElement = scaleWrapperElement.querySelector('.scale__control--value');
const imageElement = formElement.querySelector('.img-upload__preview img');

let scaleValue;

const resetScaleValue = () => {
  scaleValue = parseInt(scaleFieldElement.value, 10);
};

const initScalePhoto = () => {
  scaleWrapperElement.addEventListener('click', (evt) => {
    const smallerElement = evt.target.closest('.scale__control--smaller');
    const biggerElement = evt.target.closest('.scale__control--bigger');

    resetScaleValue();

    if (biggerElement || smallerElement) {
      if (smallerElement && scaleValue > MIN_VALUE) {
        scaleValue -= STEP;
      }

      if (biggerElement && scaleValue < MAX_VALUE) {
        scaleValue += STEP;
      }

      scaleFieldElement.value = `${scaleValue}%`;
      imageElement.style.transform = `scale(${scaleValue / 100})`;
    }
  });
};

export { initScalePhoto, resetScaleValue };
