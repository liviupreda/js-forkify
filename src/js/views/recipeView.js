import { elements } from './base';

export const clearRecipe = () => {
  elements.recipeMain.innerHTML = '';
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${Math.round(
          ingredient.measures.metric.amount
        )}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.measures.metric.unitShort.toLowerCase()}</span>
            ${ingredient.name}
        </div>
    </li>   
`;
export const showRecipe = result => {
  const html = `
  <figure class="recipe__fig">
    <img src="${result.img}" alt="${result.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${result.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          result.duration
        }</span>
        <span class="recipe__info-text"> minutes</span>
  </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          result.servings
        }</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
         </div>

      </div>
  <button class="recipe__love">
      <svg class="header__likes">
          <use href="img/icons.svg#icon-heart-outlined"></use>
      </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <ul class="recipe__ingredient-list">
      
    ${result.ingredients.map(element => createIngredient(element)).join('')}

  </ul>

  <button class="btn-small recipe__btn recipe__btn--add">
      <svg class="search__icon">
          <use href="img/icons.svg#icon-shopping-cart"></use>
      </svg>
      <span>Add to shopping list</span>
  </button>
</div>

<div class="recipe__directions">
  <h2 class="heading-2">How to cook it</h2>
  <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__by">${
        result.source
      }</span>. Please check out recipe directions at their website.
  </p>
  <a class="btn-small recipe__btn" href="${result.url}" target="_blank">
      <span>Directions</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>

  </a>
</div>
  `;
  elements.recipeMain.insertAdjacentHTML('afterbegin', html);
};

export const updateServings = recipe => {
  // Update servings
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;

  // Update ingredients
  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((e, i) => {
    e.textContent = recipe.ingredients[i].measures.metric.amount;
  });
};
