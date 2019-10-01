// Import Axios package for HTTP requests, JSON conversion and error handling
import axios from 'axios';

export default class Search {
  constructor(query, number) {
    this.query = query;
    this.number = number;
  }

  async getResults() {
    const key = 'f46015c488304ae893fde89f7a4baf4d';
    try {
      const get = await axios(
        `https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${this.number}`
      );
      this.recipes = get.data.results;
      // console.log(this.recipes);
    } catch (error) {
      console.log(error);
    }
  }
}
