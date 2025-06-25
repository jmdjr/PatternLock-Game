import { getAssetByType } from '../../assets.data';
import Button from './button';
import Phaser, { GameObjects } from 'phaser';
import CoreScene from '../../scenes/core_scene';
import { LabeledButton } from './labeledButton';

export class ButtonPanel extends Phaser.GameObjects.Container {
  static readonly TYPE: string = 'BUTTON_PANEL';

  constructor(private _scene: CoreScene, x, y) {
    super(_scene, x, y);
    this._scene.add.existing(this);
    this.layout();
  }

  layout() {

    const width: number = 3;
    const height: number = 3;
    const assetType = LabeledButton;

    const asset = getAssetByType(assetType.TYPE);
    if (!asset) return; // Ensure the button asset exists

    const addButton = (x, y) => {
      this.add(new assetType(this._scene, asset, x, y, `${x + width * y}`));
    }

    // Create a grid of buttons
    Array.from({ length: height },
      (_, j) =>
        Array.from({ length: width },
          (_, i) => addButton(i, j)
        )
    );

    const gap = asset.width * 1; // 10% of the asset width as gap
    const cellWidth = asset.width + gap;
    const cellHeight = asset.height + gap;
    const allButtons = this.getAll();

    Phaser.Actions.GridAlign(allButtons, {
      width: width,
      height: height,
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

    // this._scene.add.rectangle(this.x, this.y, width * cellWidth, height * cellHeight, 0xFF0000, 0.25).setOrigin(0, 0);
  }
}
