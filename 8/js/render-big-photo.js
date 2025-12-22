const modalElement = document.querySelector('.big-picture');
const modalImageElement = modalElement.querySelector('.big-picture__img img');
const modalLikesElement = modalElement.querySelector('.likes-count');
const modalCommentsCountElement = modalElement.querySelector('.social__comment-count');
const modalShownCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-shown-count');
const modalTotalCommentsCountElement = modalCommentsCountElement.querySelector('.social__comment-total-count');
const modalDescriptionElement = modalElement.querySelector('.social__caption');
const modalCommentsListElement = modalElement.querySelector('.social__comments');
const modalCommentsLoaderElement = modalElement.querySelector('.comments-loader');
const modalCommentsListChildren = modalCommentsListElement.children;

const renderBigPhoto = ({url, likes, comments, description}) => {
  modalImageElement.src = url;
  modalLikesElement.textContent = likes;
  modalShownCommentsCountElement.textContent = modalCommentsListChildren.length;
  modalTotalCommentsCountElement.textContent = comments.length;
  modalDescriptionElement.textContent = description;

  if (modalCommentsListChildren.length >= comments.length) {
    modalCommentsLoaderElement.classList.add('hidden');
  } else {
    modalCommentsLoaderElement.classList.remove('hidden');
  }
};

export { renderBigPhoto };
