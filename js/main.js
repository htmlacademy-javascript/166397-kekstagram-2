const PHOTOS_COUNT = 25;
const MAX_COMMENT_MESSAGES_COUNT = 2;

const CommentsIdRange = {
  MIN: 1,
  MAX: 1000
};

const AvatarIdRange = {
  MIN: 1,
  MAX: 6
};

const LikesCountRange = {
  MIN: 15,
  MAX: 200
};

const CommentsCountRange = {
  MIN: 0,
  MAX: 30
};

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Отличный был концерт!',
  'Это я на море! Пью джус!',
  'Кот опять учудил',
  'О, на улице погооодааа... ужаснаааяяя',
  'Я уже устал придумывать описания',
  'Россия для грустных'
];

const NAMES = [
  'Паша Техник',
  'Джуди Хопс',
  'Мисс Барашкис',
  'Билли Бутчер',
  'Габи Салис',
  'Валера'
];

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

let urlId = 0;
const getCommentId = createRandomIdGenetrator(CommentsIdRange.MIN, CommentsIdRange.MAX);

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarIdRange.MIN, AvatarIdRange.MAX)}.svg`,
  message: getRandomArrayElements(COMMENTS, MAX_COMMENT_MESSAGES_COUNT),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (currentId) => ({
  id: ++currentId,
  url: `photos/${++urlId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LikesCountRange.MIN, LikesCountRange.MAX),
  comments: Array.from({length: getRandomInteger(CommentsCountRange.MIN, CommentsCountRange.MAX)}, createComment)
});

const photos = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

window.console.log(photos);
