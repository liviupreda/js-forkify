import { elements } from './base';

// Return value of the search input field
export const getInput = () => elements.searchInput.value;

// Function for printing 1 recipe per call
const renderRecipe = result => {
  const html = `
  <li>
    <a class="results__link" href="#${result.id}">
        <figure class="results__fig">
            <img src="https://spoonacular.com/recipeImages/${result.id}-90x90" alt="${result.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${result.title}</h4>
            <p class="results__readyin">${result.readyInMinutes} minutes</p>
        </div>
    </a>
</li>
  `;

  elements.searchResultsUl.insertAdjacentHTML('beforeend', html);
};

// Print recipes in the left-hand column of the UI
export const renderRecipes = results => results.forEach(renderRecipe);
