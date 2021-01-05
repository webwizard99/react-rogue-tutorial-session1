class menu  {
  constructor(open) {
    this.open = open;
    this.index = 0;
  }

  toggleMenu() {
    this.open = !this.open;
  }

  setIndex(value) {
    this.index = value;
  }
}

export default menu;