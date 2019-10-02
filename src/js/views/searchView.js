import { elements } from './base';

// Return value of the search input field
export const getInput = () => elements.searchInput.value;
// Clear input
export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearRecipes = () => {
  elements.searchResultsUl.innerHTML = '';
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
const renderRecipe = result => {
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

// Print recipes in the left-hand column of the UI
export const renderRecipes = results => results.forEach(renderRecipe);
