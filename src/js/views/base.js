export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results__list').parentElement,
  searchResultsUl: document.querySelector('.results__list'),
  searchResultsPages: document.querySelector('.results__pages'),
  recipeMain: document.querySelector('.recipe'),
  recipeUL: document.querySelector('.recipe__ingredient-list'),
  shoppingUL: document.querySelector('.shopping__list')
};

// Future proof the code in case Spoonacular changes the API structure
export const apiItems = {
  title: 'result.data.title',
  image: 'result.data.image',
  duration: 'result.data.readyInMinutes',
  source: 'result.data.sourceName',
  url: 'result.data.sourceUrl',
  ingredients: 'result.data.extendedIngredients',
  servings: 'result.data.servings',
  amount: 'measures.metric.amount',
  unit: 'measures.metric.unitShort.toLowerCase()'
};

export const elementStrings = {
  spinner: 'spinner'
};

// Loading spinner
// Appears in .results and .recipe HTML classes
export const showSpinner = parentElement => {
  const spinner = `
    <div class="${elementStrings.spinner}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  // infinitely rotating SVG icon
  // attach it to the parent element
  parentElement.insertAdjacentHTML('afterbegin', spinner);
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.${elementStrings.spinner}`);
  if (spinner) spinner.parentElement.removeChild(spinner);
};
