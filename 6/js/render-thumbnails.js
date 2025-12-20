import { findTemplateById } from './utils.js';

const thumbnailTemplateElement = findTemplateById('picture');
const thumbnailsContainerElement = document.querySelector('.pictures');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');
  const likesCountElement = thumbnailElement.querySelector('.picture__likes');
  const commentsCountElement = thumbnailElement.querySelector('.picture__comments');

  thumbnailElement.href = url;
  thumbnailElement.dataset.id = id;
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;

  return thumbnailElement;
};

const renderThumbnails = (photos) => {
  if (!thumbnailsContainerElement) {
    return;
  }

  const thumbnailsListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnailElement = createThumbnail(photo);
    thumbnailsListFragment.append(thumbnailElement);
  });

  thumbnailsContainerElement.append(thumbnailsListFragment);
};

export { renderThumbnails };
