// Import Axios package for HTTP requests, JSON conversion and error handling
import axios from 'axios';
import { key } from '../config';

export default class Search {
  // get 30 query results by default
  constructor(query, number = 30) {
    this.query = query;
    this.number = number;
  }

  async getResults() {
    try {
      const get = await axios(
        `https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${this.number}`
      );
      this.recipes = get.data.results;
    } catch (error) {
      console.log(error);
    }
  }
}
