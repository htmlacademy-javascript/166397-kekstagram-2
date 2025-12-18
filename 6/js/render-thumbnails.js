import { createPhotos } from './create-photos';
const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainerElement = document.querySelector('.pictures');

const renderThumbnails = () => {
  const photos = createPhotos();
  const thumbnailsListFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
    const imageElement = thumbnailElement.querySelector('.picture__img');
    const likesCountElement = thumbnailElement.querySelector('.picture__likes');
    const commentsCountElement = thumbnailElement.querySelector('.picture__comments');

    imageElement.src = url;
    imageElement.alt = description;
    likesCountElement.textContent = likes;
    commentsCountElement.textContent = comments.length;

    thumbnailsListFragment.append(thumbnailElement);
  });

  thumbnailsContainerElement.append(thumbnailsListFragment);
};

export { renderThumbnails };
