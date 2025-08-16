import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';
import EndScene from './scenes/EndScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  scene: [BootScene, MenuScene, GameScene, UIScene, EndScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

window.i18nStrings = {}; // Loaded in BootScene
const game = new Phaser.Game(config);
