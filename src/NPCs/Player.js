import Entity from "../World/Entity";

class Player extends Entity{

  inventory = [];

  attributes = {
    name: 'Player',
    ascii: '@',
    health: 10,
    gold: 0,
    attack: 3,
    defense: 2
  }

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    if (item.attributes.name === 'Gold Coin') {
      this.attributes.gold += 1;
      console.log(this.attributes.gold);
    } else {
      this.inventory.push(item);
    }
    
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;