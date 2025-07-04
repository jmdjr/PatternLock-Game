import { Asset, getAssetByType } from "../../assets.data";
import CoreScene from "../../scenes/core_scene";
import { Inject } from "../../services/di/di.system";
import { UIBuilder } from "../ui/uiFormatter";
import Button from "./button";

export class LabeledButton extends Phaser.GameObjects.Container {
  static readonly TYPE: string = 'LABELED_BUTTON';
  private _asset: Asset;

  
  private _button: Button;
  private _label: Phaser.GameObjects.Text;

  public get button() {
    return this._button;
  }

  constructor(scene: CoreScene, asset: Asset, x: number = 0, y: number = 0, label: string = "A") {
    super(scene, x, y);

    this._asset = asset;

    this._button = new Button(scene, asset, 0, 0);
    this._button.setOrigin(0.5, 0.5);
    this.add(this._button);

    this._label = new Phaser.GameObjects.Text(scene, 0, 0, label, { align: 'center', fontSize: '24pt', color: asset.color ?? '#000000' });
    this._label.setOrigin(0.5, 0.5);
    this.add(this._label);

    this._asset = asset;

    this.setSize(asset.width, asset.height);
  }

  setTint(arg0: number) {
    this._button.setTint(arg0);
  }
  
  clearTint() {
    this._button.clearTint();
  }
  
  public get set() {
    return {
      label: (text: string) => {
        this._label.setText(text);
        return this;
      },
      click: (callback: (button: Button) => void) => {
        this._button.set.click(callback);
        return this;
      },
      over: (callback: (button: Button) => void) => {
        this._button.set.over(callback);
        return this;
      },
      out: (callback: (button: Button) => void) => {
        this._button.set.out(callback);
        return this;
      },
      down: (callback: (button: Button) => void) => {
        this._button.set.down(callback);
        return this;
      },
      up: (callback: (button: Button) => void) => {
        this._button.set.up(callback);
        return this;
      }
    }
  }
}
