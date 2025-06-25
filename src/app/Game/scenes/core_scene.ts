import ASSETS, { Asset } from '../assets.data';
import Phaser, { GameObjects } from 'phaser';
import { ButtonPanel } from '../mechanics/button/buttonPanel';
import Path from '../mechanics/path/path';

export default class CoreScene extends Phaser.Scene {
  constructor() {
    super("CoreScene");
  }

  init() { }

  preload() {
    for (let asset of ASSETS) {
      this.load?.image(asset.type, asset.url);
    }
  }

  create() {
    this.createButtonPanel();

    // generate path.
    this.createPath(100, 100);

    // make ui buttons for: 
    //    - regenerate PATH
    //    - check PATH
    //    - show PATH
    //    - start a new game (reset everything)
  }

  createButtonPanel(posX: number = 0, posY: number = 0) {
    const panel = new ButtonPanel(this, posX, posY);
  }

  createPath(posX: number = 0, posY: number = 0) {
    const path = new Path();
    const pathLabel = this.add.text(posX, posY, path.print(), { fontSize: '24pt', color: '#FFFFFF' });
  }
}