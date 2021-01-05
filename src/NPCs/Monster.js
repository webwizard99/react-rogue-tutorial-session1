import Entity from '../World/Entity';
import damageCalculator from '../utilities/damageCalculator';

class Monster extends Entity {
  action(verb, world) {
    if (verb === 'bump') {
      // attack
      world.addToHistory(`Player attacks ${this.attributes.name}!`);
      this.attributes.health = this.attributes.health - damageCalculator(world.player.attributes.attack, this.attributes.defense);
      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.remove(this);
      } else {
        world.addToHistory(`${this.attributes.name}'s health = ${this.attributes.health}`);
        world.player.attributes.health = world.player.attributes.health - damageCalculator(this.attributes.attack, world.player.attributes.defense);
        if (world.player.attributes.health <= 0) {
          world.addToHistory('You have died!');
        } else {
          world.addToHistory(`You have ${world.player.attributes.health} health.`);
        }
      }
    }
  }
}

export default Monster;