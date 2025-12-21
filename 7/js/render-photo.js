import { findTemplateById, findPhotoById } from './utils';

const modalElement = document.querySelector('.big-picture');
const modalImageElement = modalElement.querySelector('.big-picture__img img');
const modalLikesElement = modalElement.querySelector('.likes-count');
const modalCommentsCountElement = modalElement.querySelector('.social__comment-count');
const modalShownCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-shown-count');
const modalTotalCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-total-count');
const modalDescriptionElement = modalElement.querySelector('.social__caption');
const modalCommentsListElement = modalElement.querySelector('.social__comments');
const modalCommentsLoaderElement = modalElement.querySelector('.comments-loader');

const renderComments = (comments) => {
  const commentTemplateElement = findTemplateById('comment');
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({ id, avatar, message, name }) => {
    const commentElement = commentTemplateElement.cloneNode(true);
    const commentImageElement = commentElement.querySelector('.social__picture');
    const commentTextElement = commentElement.querySelector('.social__text');

    commentElement.dataset.commentId = id;
    commentImageElement.src = avatar;
    commentImageElement.alt = name;
    commentTextElement.textContent = message;

    commentsListFragment.append(commentElement);
  });

  modalCommentsListElement.innerHTML = '';
  modalCommentsListElement.append(commentsListFragment);
};

const renderBigPhoto = (thumbnailId, photos) => {
  const {url, likes, comments, description} = findPhotoById(thumbnailId, photos);

  modalImageElement.src = url;
  modalLikesElement.textContent = likes;
  modalShownCommentsCountElement.textContent = comments.length;
  modalTotalCommentsCountElement.textContent = comments.length;
  modalDescriptionElement.textContent = description;
  renderComments(comments);

  modalCommentsCountElement.classList.add('hidden');
  modalCommentsLoaderElement.classList.add('hidden');
};

export { renderBigPhoto };
