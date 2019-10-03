import { elements } from './base';

// Return value of the search input field
export const getInput = () => elements.searchInput.value;
// Clear input
export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearRecipes = () => {
  elements.searchResultsUl.innerHTML = '';
  // Clear page navigation buttons
  elements.searchResultsPages.innerHTML = '';
};

// Limits the recipe title to one line, followed by '(...)'
// default limit parameter is 15 characters (otherwise the three dots
// are displayed on a second line in my browser at 100% size)
const shortenTitle = (title, limit = 15) => {
  const shortTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        shortTitle.push(cur);
      }
      return acc + cur.length;
    }, 0); // initial accumulator value is 0
    // Return short title
    return `${shortTitle.join(' ')} (...)`;
  }
  return title;
};

// Function for printing 1 recipe per call
const showRecipe = result => {
  const html = `
  <li>
    <a class="results__link" href="#${result.id}">
        <figure class="results__fig">
            <img src="https://spoonacular.com/recipeImages/${
              result.id
            }-90x90" alt="${result.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${shortenTitle(result.title)}</h4>
            <p class="results__readyin">${result.readyInMinutes} minutes</p>
        </div>
    </a>
</li>
  `;

  elements.searchResultsUl.insertAdjacentHTML('beforeend', html);
};

// We will show either prev, next or both buttons depending on the type arg
// type = 'prev' or 'next'
const showButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto = ${
  type === 'prev' ? page - 1 : page + 1
}>
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
  </svg>
</button>
`;

const showPageButtons = (page, numResults, resultsPerPage) => {
  // Round up in case numPages != int
  const numPages = Math.ceil(numResults / resultsPerPage);
  let button;

  if (page === 1 && numPages > 1) {
    // Show only button for next page
    button = showButton(page, 'next');
  } else if (page < numPages) {
    // Show both next and prev buttons
    button = `
      ${showButton(page, 'prev')}
      ${showButton(page, 'next')}
    `;
  } else if (page === numPages && numPages > 1) {
    // Show only button for previous page
    button = showButton(page, 'prev');
  }
  elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

// Show recipes in the left-hand column of the UI
// Max 10 results per page
export const showRecipes = (results, page = 1, resultsPerPage = 10) => {
  const begin = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  results.slice(begin, end).forEach(showRecipe);

  // Show page navigation buttons
  showPageButtons(page, results.length, resultsPerPage);
};
