// -- Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, showSpinner, clearSpinner } from './views/base';

// -- Global Application state; Init = {}; stores the:
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

// -- Event listeners
const ctrlSearch = async () => {
  // Capture search query from view
  const query = searchView.getInput(); // TODO

  if (query) {
    // Create new search object and add it to state
    state.search = new Search(query);

    // Clear input and results column for new search
    searchView.clearInput();
    searchView.clearRecipes();

    // Show loading spinner and attach it to the
    // parent div of the ul;
    showSpinner(elements.searchResults);

    // Search for recipes
    await state.search.getResults();

    // Clear loading spinner
    clearSpinner();
    // Show results in UI
    searchView.showRecipes(state.search.recipes);
    // console.log(state.search.recipes);
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
