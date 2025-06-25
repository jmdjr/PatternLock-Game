import Button from './mechanics/button/button';
import { LabeledButton } from './mechanics/button/labeledButton';
import { ButtonPanel } from './mechanics/button/buttonPanel';

export interface Asset {
  type: string;
  url: string;
  width: number;
  height: number;
  color?: string; // Optional, used for LabeledButton
}
const basicButtonArt = {
  url: 'assets/game/art/button.png',
  width: 32,
  height: 32
}

const startBurstArt = {
  url: 'assets/game/art/starBurst.png',
  width: 64,
  height: 64
};

const ASSETS = [
  {
    type: LabeledButton.TYPE,
    ...startBurstArt,
    color: '#FFFFFF'
  },
  {
    type: Button.TYPE,
    ...startBurstArt
  }
];

export const getAssetByType = (type: string): Asset | undefined => {
  const asset = ASSETS.find(asset => asset.type === type);
  if (!asset)  console.error(`Asset of type ${type} not found.`);
  return asset;
};

export default ASSETS;