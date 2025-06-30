import uiConfig from './ui.config.json';

// this class is repsonsible for positioning different Game Objects on the screen
// by adding ui elements with a specific key name, the builder will position them
// according to the key names found in the ui.config.json file.
export class PhaserUIBuilder {
  private config: any;

  constructor(config: any) {
    this.config = config; 
  }

  public buildUI(scene: Phaser.Scene) {
    for (const element of this.config) {
      const { type, key, x, y } = element;
      this.addElement(scene, type, key, x, y);
    }
  }

  private addElement(scene: Phaser.Scene, type: string, key: string, x: number, y: number) {
    // Implementation for adding the element to the scene
  }
}