import ASSETS from '../assets.data';
import Phaser from 'phaser';

import Path from '../mechanics/path/path';
import { ButtonPanel } from '../mechanics/button/buttonPanel';
import { GameConsole } from '../services/console-ui/console-ui';
import { VisualPathGuess } from '../mechanics/path/visualPathGuess';
import { Inject } from '../services/di/di.system';
import { UIBuilder } from '../mechanics/ui/uiFormatter';

export default class CoreScene extends Phaser.Scene {
  private panel: ButtonPanel;
  private visualPath: VisualPathGuess;
  private path: Path;
  private pathLabel: Phaser.GameObjects.Text;
  private pathGuessLabel: Phaser.GameObjects.Text;
  
  @Inject(UIBuilder.name)
  private _uiBuilder: UIBuilder;

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
    this.createPath();
    this.createPathGuess();

    this._uiBuilder.buildUI();
  }

  override update(time: number, delta: number) {
    super.update(time, delta);
    // Update the visual path guess
    this.visualPath.update(this.input.x, this.input.y);
    this.pathGuessLabel.setText(this.visualPath.print());
  }


  createPathGuess() {
    this.createButtonPanel();
    this.visualPath = new VisualPathGuess(this, this.panel);
    this.pathGuessLabel = this.add.text(0, 0, this.visualPath.print(), { fontSize: '24pt', color: '#FFFFFF' });
    this._uiBuilder.addElement('pathGuess', (x, y) => {
      this.pathGuessLabel.setPosition(x, y);
    });
  }

  createButtonPanel() {
    this.panel = new ButtonPanel(this, 0, 0);
    this._uiBuilder.addElement('gameBoard', (posX, posY) => {
      this.panel.setPosition(posX, posY);
    });
  }

  createPath() {
    this.path = new Path();
    this.pathLabel = this.add.text(0, 0, this.path.print(), { fontSize: '24pt', color: '#FFFFFF' });
    this._uiBuilder.addElement('gameBoard', (x, y) => {
      this.pathLabel.setPosition(x, y);
    });
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