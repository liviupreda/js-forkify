export default class Likes {
  // Structure similar to the ShoppingList class
  // Does not fit as a subclass as different scope and better for
  // code granularity
  constructor() {
    this.likes = [];
  }

  addLike(id, title, duration, img) {
    const like = { id, title, duration, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(e => e.id === id);
    this.likes.splice(index, 1);
  }

  // Display the like icon on the liked recipes
  // True: has like; False: does not have like
  hasLike(id) {
    return this.likes.findIndex(e => e.id === id) !== -1;
  }

  getLikesNumber() {
    return this.likes.length;
  }
}
