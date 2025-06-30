import ASSETS from '../assets.data';
import Phaser from 'phaser';
import "src/app/Game/di-register";

import Path from '../mechanics/path/path';
import { ButtonPanel } from '../mechanics/button/buttonPanel';
import { GameConsole } from '../services/console-ui/console-ui';
import { VisualPathGuess } from '../mechanics/path/visualPathGuess';

export default class CoreScene extends Phaser.Scene {
  private panel: ButtonPanel;
  private visualPath: VisualPathGuess;
  private path: Path;
  private pathLabel: Phaser.GameObjects.Text;
  private pathGuessLabel: Phaser.GameObjects.Text;

  constructor() {
    super("CoreScene");
  }
  preload() {
    for (let asset of ASSETS) {
      this.load?.image(asset.type, asset.url);
    }
  }

  init() { }

  create() {
    this.createConsole();
    this.createButtonPanel();

    // generate path.
    this.createPath(500, 10);
    this.visualPath = new VisualPathGuess(this, this.panel);
    this.pathGuessLabel = this.add.text(500, 50, this.visualPath.print(), { fontSize: '24pt', color: '#FFFFFF' });
  }

  override update(time: number, delta: number) {
    super.update(time, delta);
    // Update the visual path guess
    this.visualPath.update(this.input.x, this.input.y);
    this.pathGuessLabel.setText(this.visualPath.print());
  }

  // make ui buttons for:
  //    - regenerate PATH
  //    - check PATH
  //    - show PATH
  //    - start a new game (reset everything)
  createButtonPanel(posX: number = 0, posY: number = 0) {
    this.panel = new ButtonPanel(this, posX, posY);
  }

  createPath(posX: number = 0, posY: number = 0) {
    this.path = new Path();
    this.pathLabel = this.add.text(posX, posY, this.path.print(), { fontSize: '24pt', color: '#FFFFFF' });
  }

  createConsole() {
    const console = new GameConsole(this, 0, 0, 800, 600);
    this.add.existing(console);
    this.input.keyboard?.on('keydown', (event: Event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (event.key === '~') {
        console.showConsole();
      }
    });
  }
}