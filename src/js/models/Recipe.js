import axios from 'axios';
import { key } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // GET https://api.spoonacular.com/recipes/716429/information?apiKey=[key]&includeNutrition=false
  async getRecipe() {
    try {
      const result = await axios(
        `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`
      );
      this.title = result.data.title;
      this.source = result.data.sourceName;
      this.img = result.data.image;
      this.url = result.data.sourceUrl;
      this.ingredients = result.data.extendedIngredients;
      this.duration = result.data.readyInMinutes;
      this.servings = result.data.servings;
    } catch (err) {
      console.log('Something went wrong while processing data');
      console.log(err);
    }
  }
}
