// food2fork.com API key 26541d5659322325bf74270a4bb31ace
// GET https://www.food2fork.com/api/search
// https://spoonacular.com/food-api/docs API key f46015c488304ae893fde89f7a4baf4d
// GET https://api.spoonacular.com/recipes/search
// import axios from 'axios';

// async function getResults(query, number) {
//   const key = 'f46015c488304ae893fde89f7a4baf4d';
//   try {
//     const get = await axios(
//       `https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${query}&number=${number}`
//     );
//     const recipes = get.data.results;
//     console.log(recipes);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getResults('cheese', 50);

// Recipe {id: "559251", title: "Breakfast Pizza", source: "Jo Cooks", img: "https://spoonacular.com/recipeImages/559251-556x370.jpg", url: "http://www.jocooks.com/breakfast-2/breakfast-pizza/", …}
// duration: 25
// id: "559251"
// img: "https://spoonacular.com/recipeImages/559251-556x370.jpg"
// ingredients: Array(9)
// 0:
// aisle: "Refrigerated"
// amount: 1
// consitency: "solid"
// id: 93610
// image: "pizza-dough.jpg"
// measures:
// metric:
// amount: 453.592
// unitLong: "grams"
// unitShort: "g"
// __proto__: Object
// us: {amount: 1, unitShort: "lb", unitLong: "pound"}
// __proto__: Object
// meta: []
// metaInformation: []
// name: "pizza dough"
// original: "1 lb pizza dough"
// originalName: "pizza dough"
// originalString: "1 lb pizza dough"
// unit: "lb"
// __proto__: Object
// 1:
// aisle: "Oil, Vinegar, Salad Dressing"
// amount: 1
// consitency: "liquid"
// id: 4053
// image: "olive-oil.jpg"
// measures:
// metric:
// amount: 1
// unitLong: "Tbsp"
// unitShort: "Tbsp"
// __proto__: Object
// us:
// amount: 1
// unitLong: "Tbsp"
// unitShort: "Tbsp"
// __proto__: Object
// __proto__: Object
// meta: []
// metaInformation: []
// name: "olive oil"
// original: "1 tbsp olive oil"
// originalName: "olive oil"
// originalString: "1 tbsp olive oil"
// unit: "tbsp"
// __proto__: Object
// 2:
// aisle: "Cheese"
// amount: 2
// consitency: "solid"
// id: 1001026
// image: "shredded-cheese-white.jpg"
// measures:
// metric:
// amount: 473.176
// unitLong: "milliliters"
// unitShort: "ml"
// __proto__: Object
// us: {amount: 2, unitShort: "cups", unitLong: "cups"}
// __proto__: Object
// meta: ["shredded"]
// metaInformation: ["shredded"]
// name: "shredded mozzarella cheese"
// original: "2 cups mozzarella cheese shredded"
// originalName: "mozzarella cheese shredded"
// originalString: "2 cups mozzarella cheese shredded"
// unit: "cups"
// __proto__: Object
// 3: {id: 1033, aisle: "Cheese", image: "parmesan.jpg", consitency: "solid", name: "parmesan cheese", …}
// 4: {id: 10311529, aisle: "Produce", image: "cherry-tomatoes.png", consitency: "solid", name: "cherry tomatoes", …}
// 5: {id: 10862, aisle: "Meat", image: "cooked-bacon.jpg", consitency: "solid", name: "fried bacon", …}
// 6: {id: 1123, aisle: "Milk, Eggs, Other Dairy", image: "egg.png", consitency: "solid", name: "eggs", …}
// 7: {id: 11156, aisle: "Produce", image: "fresh-chives.jpg", consitency: "solid", name: "fresh chives", …}
// 8: {id: 11297, aisle: "Produce", image: "parsley.jpg", consitency: "solid", name: "fresh parsley", …}
// length: 9
// __proto__: Array(0)
// servings: 6
// source: "Jo Cooks"
// title: "Breakfast Pizza"
// url: "http://www.jocooks.com/breakfast-2/breakfast-pizza/"
// __proto__: Object

// parseIngredients() {
//   // Parse ingredients into count, unit and ingredient name
//   // Alternatively can use this.ingredients[i].original
//   // i.e. '1 cup cherry tomatoes halved'

//   // let amounts = [];
//   // let units = [];
//   // let ingredientNames = [];
//   let parsedIngredients = [];
//   // let preparation = [];
//   this.ingredients.forEach(element => {
//     // amounts.push(element.measures.metric.amount);
//     // units.push(element.measures.metric.unitShort);
//     // ingredientNames.push(element.name);
//     // preparation.push(element.original);
//     parsedIngredients.push(
//       `${element.measures.metric.amount} ${element.measures.metric.unitShort} ${element.name}`
//     ); // halved, sliecd, grated etc: ${element.original.split(',')[1]}
//   });
//   console.log(parsedIngredients);
//   // console.log(units);
//   // console.log(ingredientNames);
// }

// parseIngredients 2
// parseIngredients() {
//   // Parse ingredients into count, unit and ingredient name
//   // i.e. '1 kg cherry tomatoes'
//   let parsedIngredients = [];
//   this.ingredients.forEach(element => {
//     parsedIngredients.push(
//       `${
//         element.measures.metric.amount
//       } ${element.measures.metric.unitShort.toLowerCase()} ${element.name}`
//     );
//   });
//   // Replace ingredients array in the Recipe object with the parsed values
//   this.ingredients = parsedIngredients;
// }
