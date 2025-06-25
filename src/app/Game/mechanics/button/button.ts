import { Asset } from "../../assets.data";
import CoreScene from "../../scenes/core_scene";

export default class Button extends Phaser.GameObjects.Sprite {
  static readonly TYPE: string = 'BUTTON';

  private _onDown: () => void;
  private _onOver: () => void;
  private _onUp: () => void;
  private _onOut: () => void;
  private _onClick: () => void;
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
      down: (callback: () => void) => {
        this._onDown = callback;
        return this;
      },
      over: (callback: () => void) => {
        this._onOver = callback;
        return this;
      },
      out: (callback: () => void) => {
        this._onOut = callback;
        return this;
      },
      up: (callback: () => void) => {
        this._onUp = callback;
        return this;
      },
      click: (callback: () => void) => {
        this._onClick = callback;
        return this;
      }
    }
  }

  private onClick() {
    this._onClick?.call(this);
  }

  private onOver() {
    this._onOver?.call(this);
  }

  private onOut() {
    this._onOut?.call(this);
  }

  private onUp() {
    this._onUp?.call(this);
  }

  private onDown() {
    this._onDown?.call(this);
  }
}
