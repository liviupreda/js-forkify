import { elements, apiItems } from './base';

// Toggle Like button
// <svg class="header__likes">
// <use href="img/icons.svg#icon-heart-outlined"></use>
export const toggleLikeBtn = hasLike => {
  const iconString = hasLike ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};
