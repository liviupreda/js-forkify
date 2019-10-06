import { elements, apiItems } from './base';

export const showListItem = item => {
  const html = `
  <li class="shopping__item" data-itemid="${item.id}">
      <div class="shopping__count">
          <input type="number" value="${item.amount}" step="${item.amount}"
          class="schopping__count-value">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
  </li>
  `;
  elements.shoppingUL.insertAdjacentHTML('beforeend', html);
};

export const clearListItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
