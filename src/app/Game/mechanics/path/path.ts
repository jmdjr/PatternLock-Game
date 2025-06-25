import CoreScene from "../../scenes/core_scene";

export default class Path {
  static readonly STANDARD_NUM_BUTTONS: number = 9;
  static readonly STANDARD_PATH_LENGTH: number = 5;
  private _path: number[] = [];
  private _numButtons: number = Path.STANDARD_NUM_BUTTONS;
  private _pathLength: number = Path.STANDARD_PATH_LENGTH;

  constructor(pathLength: number = Path.STANDARD_PATH_LENGTH, numButtons: number = Path.STANDARD_NUM_BUTTONS) {
    this._pathLength = pathLength;
    this._numButtons = numButtons;
    this.regen(); // Generate a new path on creation
  }

  // Shuffle the buttons indicies in the path.
  public regen() {
    this._path = Array
      .from({ length: this._numButtons },
        (_, i) => i)
      .sort(() => Math.random() - 0.5)  // Shuffle the array randomly
      .slice(0, this._pathLength);      // Take the first `pathLength` elements
  }

  public tryOrder(indexes: number[]): boolean {
    if (indexes.length !== this._path.length) {
      return false; // Invalid length
    }

    for (let i = 0; i < indexes.length; i++) {
      if (indexes[i] !== this._path[i]) {
        return false; // Mismatch found
      }
    }
    return true; // All indexes match the path
  }

  print(): string | string[] {
    return this._path.join("->");
  }

  public get get(): number[] { return this._path; }
}