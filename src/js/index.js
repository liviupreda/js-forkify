// -- Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/shoppingListView';
import * as likesView from './views/likesView';
import { elements, showSpinner, clearSpinner, apiItems } from './views/base';
import Likes from './models/Likes';

// -- Global Application state; Init = {}; stores the:
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};
window.state = state; //-----------TEST

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
      // Show recipe details in UI
      clearSpinner();
      recipeView.showRecipe(state.recipe, state.likes.hasLike(id));
    } catch (err) {
      console.log('Get recipe error');
      console.log(err);
    }
  }
};

/*-----------------------------
  SHOPPING LIST CONTROLLER
-----------------------------*/

const ctrlShoppingList = () => {
  // Create a new shopping list IF there is none
  if (!state.shopList) state.shopList = new ShoppingList();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(e => {
    const item = state.shopList.addListItem(
      e.measures.metric.amount,
      e.measures.metric.unitShort.toLowerCase(),
      e.name
    );
    listView.showListItem(item);
  });
};

// Handle delete and update list item events
elements.shoppingUL.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.shopList.deleteListItem(id);
    // Delete from UI
    listView.clearListItem(id);

    // Handle amount update
  } else if (e.target.matches('.shopping__count-value')) {
    const amount = parseFloat(e.target.value, 10);
    amount > 0
      ? state.shopList.updateAmount(id, amount)
      : state.shopList.updateAmount(id, 0);
  }
});

/*-------------------
  LIKES CONTROLLER
-------------------*/
const ctrlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const curID = state.recipe.id;

  // Current recipe has like or not? (initially NO)
  if (!state.likes.hasLike(curID)) {
    // Add Like to state
    const newLike = state.likes.addLike(
      curID,
      state.recipe.title,
      state.recipe.duration,
      state.recipe.img
    );
    // Toggle Like button
    likesView.toggleLikeBtn(true);
    // Add Like to UI Likes list
    likesView.showLikes(newLike);
    // Current recipe has like or not? (YES)
  } else {
    // Remove Like from state -- toggle Like button
    state.likes.deleteLike(curID);
    // Toggle Like button
    likesView.toggleLikeBtn(false);
    // Remove Like from UI Likes list
    likesView.deleteLike(curID);
  }

  likesView.toggleLikeMenu(state.likes.getLikesNumber());
};

// Restore liked recipes from LS on page load
window.addEventListener('load', () => {
  state.likes = new Likes();
  // Restore likes
  state.likes.readStorage();
  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getLikesNumber());
  // Show existing likes in UI
  state.likes.likes.forEach(like => likesView.showLikes(like));
});

/*-------------------
  EVENT LISTENERS
-------------------*/

['hashchange', 'load'].forEach(e => window.addEventListener(e, ctrlRecipe));

// Recipe button clicks (update servings, add to shopping list, like button)
elements.recipeMain.addEventListener('click', e => {
  // * any child
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('decrease');
      recipeView.updateServings(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('increase');
    recipeView.updateServings(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add to shopping list button is clicked
    ctrlShoppingList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like button clicked
    ctrlLike();
  }
});

window.l = new ShoppingList(); // ------ TEST
