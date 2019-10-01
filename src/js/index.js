// Global app controller
// food2fork.com API key 26541d5659322325bf74270a4bb31ace
// GET https://www.food2fork.com/api/search
// https://spoonacular.com/food-api/docs API key f46015c488304ae893fde89f7a4baf4d
// GET https://api.spoonacular.com/recipes/search

// Import Axios package for HTTP requests, JSON conversion and error handling
import axios from 'axios';

async function getResults(query, number) {
  const key = 'f46015c488304ae893fde89f7a4baf4d';
  try {
    const get = await axios(
      `https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${query}&number=${number}`
    );
    const recipes = get.data.results;
    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}
getResults('pizza', 30);
