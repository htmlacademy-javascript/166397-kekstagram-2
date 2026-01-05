import { findTemplateById } from './utils.js';

const thumbnailsContainerElement = document.querySelector('.pictures');
const thumbnailTemplateElement = findTemplateById('picture');

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

const renderThumbnails = (photos, container = thumbnailsContainerElement) => {
  if (!container) {
    return;
  }

  const thumbnailsListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnailElement = createThumbnail(photo);
    thumbnailsListFragment.append(thumbnailElement);
  });

  container.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  container.append(thumbnailsListFragment);
};

export { renderThumbnails };
