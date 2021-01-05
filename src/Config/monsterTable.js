const monsterTable = [
  {
    name: 'Ogre',
    color: 'lightgrey',
    ascii: 'O',
    offset: { x: 2, y: 3 },
    health: 6,
    attack: 4,
    defense: 4
  },
  {
    name: 'Kobold',
    color: 'green',
    ascii: 'K',
    offset: { x: 4, y: 3 },
    health: 3,
    attack: 2,
    defense: 2
  },
  {
    name: 'Slime',
    color: 'darkgreen',
    ascii: 'S',
    offset: { x: 3, y: 2 },
    health: 2,
    attack: 2,
    defense: 1
  },
  {
    name: 'Dragon',
    color: 'red',
    ascii: 'D',
    offset: { x: 2, y: 3 },
    health: 10,
    attack: 8,
    defense: 7
  }
]

export default monsterTable;