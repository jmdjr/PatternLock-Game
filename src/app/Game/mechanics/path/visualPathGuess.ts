import { ButtonPanel } from "../button/buttonPanel";
import { LabeledButton } from "../button/labeledButton";

export class VisualPathGuess {
  private currentPathIndexes: number[] = [];
  private isDrawingPath: boolean = false;
  private pathGraphics?: Phaser.GameObjects.Graphics;
  private draggedGraphics?: Phaser.GameObjects.Graphics;
  private scene: Phaser.Scene;
  private panel: ButtonPanel;

  constructor(scene: Phaser.Scene, panel: ButtonPanel) {
    this.scene = scene;
    this.panel = panel;
    this.setupPathDrawingSystem();
  }

  public print() {
    return this.currentPathIndexes.join('->');
  }

  private setupPathDrawingSystem() {
    // Create graphics object for drawing the path
    this.pathGraphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0x00ff00 } });
    this.draggedGraphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xff0000 } });

    // Listen for pointer events on each button
    this.panel.set.down((_, index: number) => {
        this.isDrawingPath = true;
        this.currentPathIndexes = [index];
        this.redrawPath();
      });

    this.panel.set.over((_, index: number) => {
        if (this.isDrawingPath && !this.currentPathIndexes.includes(index)) {
          this.currentPathIndexes.push(index);
          this.redrawPath();
        }
      });

    this.scene.input.on('pointerup', () => {
      this.stopDrawingPath();
    });

    // Listen for pointer up anywhere
    this.panel.set.up(() => {
      this.stopDrawingPath();
    });
  }

  private stopDrawingPath() {
    if (this.isDrawingPath) {
      this.isDrawingPath = false;
      this.draggedGraphics?.clear();
    }
  }

  private redrawPath() {
    if (!this.pathGraphics) return;
    this.pathGraphics.clear();

    if (this.currentPathIndexes.length < 2) return;

    const points = this.currentPathIndexes.map(idx => {
      const btn = this.panel.getAll()[idx] as LabeledButton;
      return new Phaser.Math.Vector2(btn.x, btn.y);
    });

    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.pathGraphics.lineTo(points[i].x, points[i].y);
    }
    this.pathGraphics.strokePath();
  }

  public update(x: number, y: number) {
    // this function is used to draw one path line from the last point to the current pointer position
    if (!this.isDrawingPath || !this.draggedGraphics) return;

    const lastPoint = this.currentPathIndexes[this.currentPathIndexes.length - 1];
    const btn = this.panel.getAll()[lastPoint] as LabeledButton;

    this.draggedGraphics.clear();
    this.draggedGraphics.lineStyle(4, 0xff0000);
    this.draggedGraphics.beginPath();
    this.draggedGraphics.moveTo(btn.x, btn.y);
    this.draggedGraphics.lineTo(x, y);
    this.draggedGraphics.strokePath();
  }
}