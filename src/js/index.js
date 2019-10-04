// -- Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, showSpinner, clearSpinner } from './views/base';

// -- Global Application state; Init = {}; stores the:
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

/*-------------------
  SEARCH CONTROLLER
-------------------*/

const ctrlSearch = async () => {
  // Capture search query from view
  const query = searchView.getInput();
  // const query = 'pizza'; // ---------------- for TEST purposes
  if (query) {
    // Create new search object and add it to state
    state.search = new Search(query);

    // Clear input and results column for new search
    searchView.clearInput();
    searchView.clearRecipes();

    // Show loading spinner and attach it to the
    // parent div of the ul;
    showSpinner(elements.searchResults);

    try {
      // Search for recipes
      await state.search.getResults();
      // Clear loading spinner
      clearSpinner();
      // Show results in UI
      searchView.showRecipes(state.search.recipes);
      // console.log(state.search.recipes);
    } catch (err) {
      console.log('Search error');
      console.log(err);
      clearSpinner();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  // Prevent page from reloading
  e.preventDefault();
  ctrlSearch();
});

// Event listener for page navigation buttons; Event delegation
elements.searchResultsPages.addEventListener('click', e => {
  // Clicking on the span or svg icon of the button will return
  // the closest ancestor with the class '.btn-inline' i.e. the page button
  // clicking on the '.results__pages' div will return NULL
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    // Read the data-goto attribute in the showButton HTML
    // Returns a string => convert to decimal number (radix 10)
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearRecipes();
    searchView.showRecipes(state.search.recipes, goToPage);
  }
});

/*-------------------
  RECIPE CONTROLLER
-------------------*/

const ctrlRecipe = async () => {
  // http://localhost:8080/#[id]
  // Get ID from URL
  const id = window.location.hash.replace('#', ''); // remove the hash before the id

  if (id) {
    // Init UI
    // clear recipeMain
    recipeView.clearRecipe();
    showSpinner(elements.recipeMain);

    // Highlight selected ingredient in search view
    // Only works if there was an actual search
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // Create current recipe object and store it in the state
    state.recipe = new Recipe(id);
    window.r = state.recipe; // ---------------- for TEST purposes
    try {
      // Get recipe data
      await state.recipe.getRecipe();
      console.log(state.recipe);

      // Show recipe ingredients array
      //state.recipe.parseIngredients();

      // Show recipe details in UI
      clearSpinner();
      recipeView.showRecipe(state.recipe);
    } catch (err) {
      console.log('Get recipe error');
      console.log(err);
    }
  }
};

window.addEventListener('hashchange', ctrlRecipe); // #[id]
// window.addEventListener('load', ctrlRecipe); // fires whenever the window is loaded
// ['hashchange', 'load'].forEach(e => window.addEventListener(e, ctrlRecipe));
