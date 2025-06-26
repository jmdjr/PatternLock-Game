import { getAssetByType } from '../../assets.data';
import Button from './button';
import Phaser, { GameObjects } from 'phaser';
import CoreScene from '../../scenes/core_scene';
import { LabeledButton } from './labeledButton';

export class ButtonPanel extends Phaser.GameObjects.Container {
  static readonly TYPE: string = 'BUTTON_PANEL';
  static readonly WIDTH: number = 3;
  static readonly HEIGHT: number = 3;

  constructor(private _scene: CoreScene, x, y) {
    super(_scene, x, y);
    this._scene.add.existing(this);
    this.layout();
  }

  layout() {
    const assetType = LabeledButton;

    const asset = getAssetByType(assetType.TYPE);
    if (!asset) return; // Ensure the button asset exists

    const addButton = (x, y) => {
      this.add(new assetType(this._scene, asset, x, y, `${x + ButtonPanel.WIDTH * y}`));
    }

    // Create a grid of buttons
    Array.from({ length: ButtonPanel.HEIGHT },
      (_, j) =>
        Array.from({ length: ButtonPanel.WIDTH },
          (_, i) => addButton(i, j)
        )
    );

    const gap = asset.width * 1; // 10% of the asset width as gap
    const cellWidth = asset.width + gap;
    const cellHeight = asset.height + gap;
    const allButtons = this.getAll();

    Phaser.Actions.GridAlign(allButtons, {
      width: ButtonPanel.WIDTH,
      height: ButtonPanel.HEIGHT,
      cellWidth: cellWidth,
      cellHeight: cellHeight,
      x: this.x,
      y: this.y
    });

    // set all buttons over to change color on hover
    allButtons.forEach((button: GameObjects.GameObject) => {
      if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
      const labeledButton = button as LabeledButton;
      
      labeledButton.set.over(() => {
        labeledButton.setTint(0x00FF00);
      });

      labeledButton.set.out(() => {
        labeledButton.clearTint();
      });
    });

    // a getter for a set object used to set the same event handlers for all buttons.set event setter
    // this._scene.add.rectangle(this.x, this.y, width * cellWidth, height * cellHeight, 0xFF0000, 0.25).setOrigin(0, 0);
  }

  public get set() {
    return {
      click: (callback: (button: Button, index: number) => void) => {
        this.getAll().forEach((button: GameObjects.GameObject, index: number) => {
          if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
          (button as LabeledButton).set.click(callback.bind(null, button.button, index));
        });
        return this;
      },
      over: (callback: (button: Button, index: number) => void) => {
        this.getAll().forEach((button: GameObjects.GameObject, index: number) => {
          if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
          (button as LabeledButton).set.over(callback.bind(null, button.button, index));
        });
        return this;
      },
      out: (callback: (button: Button, index: number) => void) => {
        this.getAll().forEach((button: GameObjects.GameObject, index: number) => {
          if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
          (button as LabeledButton).set.out(callback.bind(null, button.button, index));
        });
        return this;
      },
      down: (callback: (button: Button, index: number) => void) => {
        this.getAll().forEach((button: GameObjects.GameObject, index: number) => {
          if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
          (button as LabeledButton).set.down(callback.bind(null, button.button, index));
        });
        return this;
      },
      up: (callback: (button: Button, index: number) => void) => {
        this.getAll().forEach((button: GameObjects.GameObject, index: number) => {
          if (!(button instanceof LabeledButton)) return; // Ensure the button is of the correct type
          (button as LabeledButton).set.up(callback.bind(null, button.button, index));
        });
        return this;
      }
    };
  }
}
