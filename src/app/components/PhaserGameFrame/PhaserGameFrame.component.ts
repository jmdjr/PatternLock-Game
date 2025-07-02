import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import CoreScene from 'src/app/Game/scenes/core_scene';

import uiConfig from '../../Game/ui.config.json';

@Component({
  selector: 'app-PhaserGameFrame',
  templateUrl: './PhaserGameFrame.component.html',
  styleUrls: ['./PhaserGameFrame.component.css']
})
export class PhaserGameFrameComponent implements OnInit {
  game: Phaser.Game | null;
  coreScene: CoreScene;
  constructor() { }

  ngOnInit() {
    this.coreScene = new CoreScene();

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      parent: 'game-frame',
      backgroundColor: uiConfig.backgroundColor,
      banner: false,
      scale: {
        height: uiConfig.height,
        width: uiConfig.width,
        mode: Phaser.Scale.FIT,
      },
      dom: {
        createContainer: true
      },
      scene: this.coreScene,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      }
    };

    this.game = new Phaser.Game(config);
  }
}
