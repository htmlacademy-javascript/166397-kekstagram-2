import { findTemplateById } from './utils.js';

const commentTemplateElement = findTemplateById('comment');

const createComment = ({ id, avatar, message, name }) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');
  const commentTextElement = commentElement.querySelector('.social__text');

  commentElement.dataset.commentId = id;
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentTextElement.textContent = message;

  return commentElement;
};

const renderComments = (comments, container) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);

    commentsListFragment.append(commentElement);
  });

  container.append(commentsListFragment);
};

export { renderComments };
