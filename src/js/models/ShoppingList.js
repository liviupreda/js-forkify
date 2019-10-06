// Use uniqid package to generate unique ID's for shopping list items
import uniqid from 'uniqid';

export default class ShoppingList {
  // The shopping list will be initially empty and will be
  // subsequently populated
  constructor() {
    this.items = [];
  }

  addListItem(amount, unit, ingredient) {
    const item = {
      id: uniqid(),
      amount,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  // TODO
  deleteListItem(id) {
    const index = this.items.findIndex(e => e.id === id);
    // [2, 4, 8] splice(1 = start index, 2 = how many elements to splice)
    // => return [4, 8], original array = [2]
    // [2, 4, 8] slice(1 = start index,2 = end index)
    // => return 4, original array = [2, 4, 8]
    // slice does NOT mutate the original array
    this.items.splice(index, 1);
  }

  updateAmount(id, newAmount) {
    this.items.find(e => e.id === id).amount = newAmount;
  }
}
