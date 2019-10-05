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
      this.img = result.data.image;
      this.duration = result.data.readyInMinutes;
      this.source = result.data.sourceName;
      this.url = result.data.sourceUrl;
      this.ingredients = result.data.extendedIngredients;
      this.servings = result.data.servings;
    } catch (err) {
      console.log('Something went wrong while processing data');
      console.log(err);
    }
  }

  // type= [increase, decrease] number of servings
  updateServings(type) {
    // Servings
    const newServings =
      type === 'decrease' ? this.servings - 1 : this.servings + 1;
    // Ingredients
    this.ingredients.forEach(element => {
      element.measures.metric.amount = (
        element.measures.metric.amount *
        (newServings / this.servings)
      ).toFixed(1);
    });

    this.servings = newServings;
  }
}
