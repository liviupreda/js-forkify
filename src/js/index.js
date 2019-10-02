// -- Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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
  console.log(query);
  // Spoonacular API has 10 default results,
  // get 30 query results
  const resCount = 30;

  if (query) {
    // Create new search object and add it to state
    state.search = new Search(query, resCount);

    // Clear input and results column for new search
    searchView.clearInput();
    searchView.clearRecipes();

    // Show loading spinner in UI

    // Search for recipes
    await state.search.getResults();

    // Show results in UI
    searchView.renderRecipes(state.search.recipes);
    console.log(state.search.recipes);
  }
};

elements.searchForm.addEventListener('submit', e => {
  // Prevent page from reloading
  e.preventDefault();
  ctrlSearch();
});
