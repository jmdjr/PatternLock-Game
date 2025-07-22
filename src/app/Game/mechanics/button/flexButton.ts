import { Asset } from "../../assets.data";
import CoreScene from "../../scenes/core_scene";
import { ButtonSetEvents, IButtonEventSetter } from "./buttonSetEvents";

export class FlexButton extends Phaser.GameObjects.NineSlice implements IButtonEventSetter<FlexButton> {
  static readonly TYPE: string = 'FLEX_BUTTON';

  constructor(scene: CoreScene, asset: Asset, x: number = 0, y: number = 0) {
    super(scene, x, y, asset.type);
    this.setOrigin(0.5, 0.5);
  }

  private _set: ButtonSetEvents<FlexButton> = new ButtonSetEvents<FlexButton>();
  public get set() {
    return this._set;
  }
}
