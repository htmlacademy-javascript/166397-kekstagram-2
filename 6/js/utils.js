const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayElements = (elements, maxItems) => {
  const usedElements = [];

  const iterations = getRandomInteger(1, maxItems);

  if (usedElements.length >= iterations) {
    return;
  }

  for (let i = 1; i <= iterations; i++) {
    let currentElement = getRandomArrayElement(elements);

    while (usedElements.includes(currentElement)) {
      currentElement = getRandomArrayElement(elements);
    }

    usedElements.push(currentElement);
  }

  return usedElements.join(' ');
};

const createRandomIdGenetrator = (a, b) => {
  const values = [];

  return () => {
    let currentValue = getRandomInteger(a, b);

    if (values.length >= Math.max(a, b) - Math.min(a, b) + 1) {
      window.console.error('Перебраны все значения из диапазона');
      return null;
    }
    while (values.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    values.push(currentValue);

    return currentValue;
  };
};

const findTemplateById = (id) => {
  const template = document.querySelector(`#${id}`);

  if (!template) {
    throw new Error('Element not found');
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('Element in not a template');
  }

  return template.content.firstElementChild;
};

export { getRandomInteger, getRandomArrayElement, getRandomArrayElements, createRandomIdGenetrator, findTemplateById };
