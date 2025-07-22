import Button from './mechanics/button/button';
import { FlexButton } from './mechanics/button/flexButton';
import { LabeledButton } from './mechanics/button/labeledButton';

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

// const flexButtonArt = {
//   url: 'assets/game/art/flexButton.png',
//   width: 64,
//   height: 64
// };

const ASSETS = [
  {
    type: LabeledButton.TYPE,
    ...startBurstArt,
    color: '#FFFFFF'
  },
  {
    type: Button.TYPE,
    ...startBurstArt
  }, 
  // {
  //   type: FlexButton.TYPE,
  //   ...flexButtonArt
  // }
];

export const getAssetByType = (type: string): Asset => {
  const asset = ASSETS.find(asset => asset.type === type);

  if (!asset)  {
    throw new Error(`Asset of type ${type} not found.`);
  }

  return asset;
};

export default ASSETS;