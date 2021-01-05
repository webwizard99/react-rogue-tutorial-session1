import React, { useRef, useEffect, useState } from 'react';
import './reset.css';
import './ReactRogue.css';
import InputManager from '../../utilities/InputManager';
import Spawner from '../../World/Spawner';
import World from '../../World/World';
import Menu from '../../ui/Menu';
import levelConstants from '../../Config/levelConstants';

const ReactRogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  // const [player, setPlayer] = useState(new Player(1, 2, tileSize));
  const [world, setWorld] = useState(new World(width, height, tileSize));
  const [menu, setMenu] = useState(new Menu(false));

  const handleInput = (action, data) => {
    if (action === 'open') {
      console.log('open');
      let newMenu = new Menu();
      Object.assign(newMenu, menu);
      newMenu.toggleMenu();
      setMenu(newMenu);
      let newWorld = new World();
      Object.assign(newWorld, world);
      setWorld(newWorld);
      return;
    }
    if (menu.open) {
      let newMenu = new Menu();
      Object.assign(newMenu, menu);
      console.log(world.player.inventory.length);
      console.log(data.y);
      console.log(menu.index);
      if (menu.index >= (world.player.inventory.length -1) && data.y > 0) {
        newMenu.setIndex(0);
      } else {
        if (menu.index <= 0) {
          newMenu.setIndex(world.player.inventory.length -1);
        } else {
          newMenu.setIndex(menu.index + data.y);
        }
        
      }
      setMenu(newMenu);
      let newWorld = new World();
      Object.assign(newWorld, world);
      setWorld(newWorld);
      console.log('menu open');
      return;
    }
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  useEffect(() => {
    console.log('Create Map!');
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(levelConstants.spawnLoot);
    spawner.spawnMonsters(levelConstants.spawnMonsters);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    console.log("Draw to canvas")
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    world.draw(ctx);
  })

  return (
  <div className="game-wrapper">
    <canvas 
    ref={canvasRef}  
    width={width * tileSize} 
    height={height * tileSize} 
    style={{ border: '1px solid black',
    background: 'DimGray' }}
    ></canvas>
    <div className="detail-wrapper">
      <div className="sector-label">
        Inventory
      </div>
      <ul className="inventory">
        {world.player.inventory.map((item, index) => {
          let itemClass = '';
          if (index === menu.index && menu.open) {
            itemClass += 'active';
          }
          return (
            <li key={index} className={itemClass}>{item.attributes.ascii} {item.attributes.name}</li>
          )
        })}
      </ul>
      <div className="sector-label">
        Combat Log
      </div>
      <ul className="combat-log">
        {world.history.map((entry, index) => {
          return (
            <li key={index}>{entry}</li>
          )
        })}
      </ul>
    </div>
    <div className="stats-wrapper">
      <p>Player</p>
      <p>Gold: {world.player.attributes.gold}</p>
    </div>
  </div>)
}

export default ReactRogue;