import { Asset } from "../../assets.data";
import CoreScene from "../../scenes/core_scene";
import Button from "./button";

export class LabeledButton extends Phaser.GameObjects.Container {
  static readonly TYPE: string = 'LABELED_BUTTON';

  private _button: Button;
  private _label: Phaser.GameObjects.Text;
  private _asset: Asset; // Store asset for hit area calculations

  public get button() {
    return this._button;
  }

  constructor(scene: CoreScene, asset: Asset, x: number = 0, y: number = 0, label: string = "A") {
    super(scene, x, y);

    this._asset = asset; // Store asset for later use

    this._button = new Button(scene, asset, 0, 0);
    this._button.setOrigin(0.5, 0.5);
    // Disable the button's individual interactivity since we'll handle it at container level
    this._button.disableInteractive();
    this.add(this._button);

    this._label = new Phaser.GameObjects.Text(scene, 0, 0, label, { align: 'center', fontSize: '32pt', color: asset.color ?? '#000000' });
    this._label.setOrigin(0.5, 0.5);
    this.add(this._label);

    // Set size first, then make the entire area interactive with a rectangle
    this.setSize(asset.width, asset.height);
    this.updateHitArea();
    
    // Set up event forwarding from container to button's event system
    this.on('pointerdown', () => this._button.set._down.call(this, this._button), this);
    this.on('pointerup', () => this._button.set._up.call(this, this._button), this);
    this.on('pointerover', () => this._button.set._over.call(this, this._button), this);
    this.on('pointerout', () => this._button.set._out.call(this, this._button), this);
    this.on('click', () => this._button.set._click.call(this, this._button), this);
  }

  setTint(arg0: number) {
    this._button.setTint(arg0);
    this._label.setTint(arg0);
  }
  
  clearTint() {
    this._button.clearTint();
    this._label.clearTint();
  }
  
  private updateHitArea() {
    const buttonWidth = this._asset.width;
    const buttonHeight = this._asset.height;
    const hitAreaWidth = Math.max(buttonWidth, this._label.width);
    const hitAreaHeight = Math.max(buttonHeight, this._label.height);

    // Use a custom hit test function for more control
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-hitAreaWidth / 2, -hitAreaHeight / 2, hitAreaWidth, hitAreaHeight),
      useHandCursor: true
    });
  }

  public get set() {
    return {
      ...this._button.set,
      label: (text: string) => {
        this._label.setText(text);
        this.updateHitArea(); // Recalculate hit area after text changes
        return this;
      }
    };
  }
}
