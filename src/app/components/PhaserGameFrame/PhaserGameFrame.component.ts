import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import CoreScene from 'src/app/Game/scenes/core_scene';
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
      backgroundColor: '#000000',
      banner: false,
      scale: {
        mode: Phaser.Scale.FIT
      },
      scene: this.coreScene,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        }
      }
    };

    this.game = new Phaser.Game(config);
  }
}
