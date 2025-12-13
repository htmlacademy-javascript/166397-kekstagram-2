import { getRandomInteger, getRandomArrayElement, getRandomArrayElements, createRandomIdGenetrator } from './utils';
import { createPhotosData } from './data';

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

const { COMMENTS, DESCRIPTIONS, NAMES} = createPhotosData();

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

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

export { createPhotos };
