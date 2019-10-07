import { elements, apiItems } from './base';
import { shortenTitle } from './searchView';

// Toggle Like button
// <svg class="header__likes">
// <use href="img/icons.svg#icon-heart-outlined"></use>
export const toggleLikeBtn = hasLike => {
  const iconString = hasLike ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

// Show Likes menu only if there are any liked recipes
export const toggleLikeMenu = likesNumber => {
  elements.likesMenu.style.visibility = likesNumber > 0 ? 'visible' : 'hidden';
};

// Show likes in the Like menu
export const showLikes = like => {
  const html = `
  <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.img}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${shortenTitle(like.title)}</h4>
              <p class="likes__duration">${like.duration} minutes</p>
          </div>
      </a>
  </li>
  `;

  elements.likesUL.insertAdjacentHTML('beforeend', html);
};

export const deleteLike = id => {
  const e = document.querySelector(`.likes__link[href*="#${id}"]`)
    .parentElement;
  if (e) e.parentElement.removeChild(e);
};
