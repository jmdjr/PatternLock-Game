import { GameEvents } from "../../scenes/core_scene";
import { ButtonPanel } from "../button/buttonPanel";
import { LabeledButton } from "../button/labeledButton";
import { PathSequence } from "./path";

export class VisualPathGuess extends Phaser.Events.EventEmitter {
  private currentPathIndexes: PathSequence = [];
  private isDrawingPath: boolean = false;
  private pathGraphics?: Phaser.GameObjects.Graphics;
  private draggedGraphics?: Phaser.GameObjects.Graphics;
  private scene: Phaser.Scene;
  private panel: ButtonPanel;

  private lineStyle = {
    width: 32,
    color: 0x00ff00,
    alpha: 0.5
  };

  private draggedLineStyle = {
    width: 32,
    color: 0xff0000,
    alpha: 0.5
  };

  constructor(scene: Phaser.Scene, panel: ButtonPanel) {
    super();
    this.scene = scene;
    this.panel = panel;
    this.setupPathDrawingSystem();
  }

  public print() {
    return this.currentPathIndexes.join('->');
  }

  public get path() {
    return this.currentPathIndexes
  }

  public reset() {
    this.currentPathIndexes = [];
    this.pathGraphics?.clear();
    this.draggedGraphics?.clear();
  }

  public setPath(path: PathSequence) {
    this.reset();
    this.currentPathIndexes = path;
    this.redrawPath();
  }
    
  private setupPathDrawingSystem() {
    // Create graphics object for drawing the path
    this.pathGraphics = this.scene.add.graphics({ lineStyle: this.lineStyle });
    this.draggedGraphics = this.scene.add.graphics({ lineStyle: this.draggedLineStyle });

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
      if(!this.isDrawingPath) return;
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
      this.emit(GameEvents.PATH_DRAWN_END, this.path);
    }
  }

  private redrawPath() {
    if (!this.pathGraphics) return;
    this.pathGraphics.clear();

    if (this.currentPathIndexes.length < 2) return;

    const points = this.currentPathIndexes.map(idx => {
      const btn = this.panel.getAll()[idx] as LabeledButton;
      return this.shiftVector(btn.x, btn.y);
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
    const pt = this.shiftVector(btn.x, btn.y);

    this.draggedGraphics.clear();
    this.draggedGraphics.beginPath();
    this.draggedGraphics.moveTo(pt.x, pt.y);
    this.draggedGraphics.lineTo(x, y);
    this.draggedGraphics.strokePath();
  }

  private shiftVector(dx: number, dy: number): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(dx + this.panel.x, dy + this.panel.y);
  }
}