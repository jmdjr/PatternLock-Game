import { PathSequence } from "./path";

export class PathSequenceFeedbackEffect {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Arc;
  private activeTween?: Phaser.Tweens.Tween;

  graphicSize: number = 32;
  private startDelay: number = 300; // Delay before starting the animation
  private endDelay: number = 100; // Delay after the last segment

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = scene.add.circle(0, 0, this.graphicSize, 0xFFFFFF);
    this.graphics.setAlpha(0);
  }

  // Runs animation to visualize the path sequence feedback
  // solution: the correct path sequence
  // guess: the user's guessed path sequence
  // positions: the positions of all the buttons
  public run(solution: PathSequence, guess: PathSequence, positions: Phaser.Math.Vector2[]) {
    if (this.activeTween) {
      this.activeTween.stop();
    }

    // Animate each segment sequentially
    const drawSegment = (i: number) => {
      if (i >= guess.length) return;

      let color = 0xFF0000; // Default: red
      if (solution[i] === guess[i]) {
        color = 0x00FF00; // Green: correct value and position
      } else if (solution.includes(guess[i])) {
        color = 0xFFFF00; // Yellow: value exists, wrong position
      }
      const startPos = positions[guess[i]];

      this.graphics.setPosition(startPos.x, startPos.y);
      this.graphics.fillColor = color;
      this.graphics.alpha = 0;

      this.activeTween = this.scene.tweens.add({
        targets: this.graphics,
        alpha: 1,
        duration: 200,
        delay: 300,
        yoyo: 1,
        onComplete: () => {
          drawSegment(i + 1);
        }
      });
    };
    drawSegment(0);
  }

  public reset() {
    if (this.activeTween) {
      this.activeTween.stop();
    }
    this.graphics.setAlpha(0);
  }

  public destroy(): void {
    if (this.graphics) {
      this.graphics.destroy();
    }
  }
}