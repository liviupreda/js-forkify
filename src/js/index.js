// -- Global app controller

import Search from './models/Search';

// -- Global Application state; Init = {}; stores the:
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

// -- Event listeners
const ctrlSearch = async () => {
  // Capture search query from view
  const query = 'pizza'; // TODO
  // Spoonacular API has 10 default results, get 30 results for default search
  const resCount = 30; // Query results count

  if (query) {
    // Create new search object and add it to state
    state.search = new Search(query, resCount);

    // Show loading spinner in UI

    // Search for recipes
    await state.search.getResults();

    // Show results in UI
    console.log(state.search.recipes);
  }
};

document.querySelector('.search').addEventListener('submit', e => {
  // Prevent page from reloading
  e.preventDefault();
  ctrlSearch();
});
