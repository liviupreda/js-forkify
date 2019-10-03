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

  parseIngredients() {
    // Parse ingredients into count, unit and ingredient name
    // i.e. '1 kg cherry tomatoes'
    let parsedIngredients = [];
    this.ingredients.forEach(element => {
      parsedIngredients.push(
        `${
          element.measures.metric.amount
        } ${element.measures.metric.unitShort.toLowerCase()} ${element.name}`
      );
    });
    // Replace ingredients array in the Recipe object with the parsed values
    this.ingredients = parsedIngredients;
  }
}
