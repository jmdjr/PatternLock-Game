import { Asset } from "../../assets.data";
import CoreScene from "../../scenes/core_scene";

export default class Button extends Phaser.GameObjects.Sprite {
  static readonly TYPE: string = 'BUTTON';

  private _onDown: (button: Button) => void;
  private _onOver: (button: Button) => void;
  private _onUp: (button: Button) => void;
  private _onOut: (button: Button) => void;
  private _onClick: (button: Button) => void;
  private _asset: Asset;

  constructor(scene: CoreScene, asset: Asset, x: number = 0, y: number = 0) {
    if (!scene) {
      throw new Error('Scene is required');
    }

    if (!asset) {
      throw new Error('Asset is required');
    }

    super(scene, x * asset.width, y * asset.height, asset.type);

    this._asset = asset;
    scene.add.existing(this);
    this.setInteractive();
    
    this.on('pointerdown', this.onDown, this);
    this.on('pointerup', this.onUp, this);
    this.on('pointerover', this.onOver, this);
    this.on('pointerout', this.onOut, this);
    this.on('click', this.onClick, this);
  }

  public get set() {
    return {
      down: (callback: (button: Button) => void) => {
        this._onDown = callback;
        return this;
      },
      over: (callback: (button: Button) => void) => {
        this._onOver = callback;
        return this;
      },
      out: (callback: (button: Button) => void) => {
        this._onOut = callback;
        return this;
      },
      up: (callback: (button: Button) => void) => {
        this._onUp = callback;
        return this;
      },
      click: (callback: (button: Button) => void) => {
        this._onClick = callback;
        return this;
      }
    }
  }

  private onClick() {
    this._onClick?.call(this, this);
  }

  private onOver() {
    this._onOver?.call(this, this);
  }

  private onOut() {
    this._onOut?.call(this, this);
  }

  private onUp() {
    this._onUp?.call(this, this);
  }

  private onDown() {
    this._onDown?.call(this, this);
  }
}
