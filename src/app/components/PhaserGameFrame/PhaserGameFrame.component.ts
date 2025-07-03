import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import CoreScene from 'src/app/Game/scenes/core_scene';

import uiConfig from '../../Game/ui.config.json';
import { UIConfig } from '../../Game/mechanics/ui/ui.config';

@Component({
  selector: 'app-PhaserGameFrame',
  templateUrl: './PhaserGameFrame.component.html',
  styleUrls: ['./PhaserGameFrame.component.css']
})
export class PhaserGameFrameComponent implements OnInit {
  game: Phaser.Game | null;
  coreScene: CoreScene;
  uiConfig: UIConfig = uiConfig;

  constructor() { }

  ngOnInit() {
    this.coreScene = new CoreScene();

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      parent: 'game-frame',
      backgroundColor: this.uiConfig.backgroundColor,
      banner: false,
      scale: {
        height: this.uiConfig.height,
        width: this.uiConfig.width,
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

  goFullScreen() {
    if (!this.game) {
      alert('Game is not initialized yet.');
      return;
    }
    if (this.game.scale.isFullscreen) {
      this.game.scale.stopFullscreen();
      return;
    }

    // Start fullscreen mode
    this.game.scale.startFullscreen();
  }
}
