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

    // Persist data in local storage
    this.persistData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(e => e.id === id);
    this.likes.splice(index, 1);
    // Persist data in local storage
    this.persistData();
  }

  // Display the like icon on the liked recipes
  // True: has like; False: does not have like
  hasLike(id) {
    return this.likes.findIndex(e => e.id === id) !== -1;
  }

  getLikesNumber() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    // If storage empty, returns NULL
    // Else, restore likes from LS
    if (storage) this.likes = storage;
  }
}
