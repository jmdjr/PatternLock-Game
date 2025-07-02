import { Register } from '../../services/di/di.system';
import uiConfig from '../../ui.config.json';
import { UI_CONFIG_KEY, UIConfig } from './ui.config';

@Register()
export class UIBuilder {
  private _config: UIConfig = uiConfig;
  private _elements: Map<string, (x: number, y: number) => void> = new Map();

  public buildUI() {
    const elementMap = this._elements;
    this._config.ui.map((element) => {
      const construct = elementMap.get(element.key);
      if (construct) {
        construct(element.x, element.y);
      }
    });
  }

  addElement(key: UI_CONFIG_KEY, construct: (x: number, y: number) => void) {
    // Implementation for adding the element to the scene
    this._elements.set(key, construct);
  }
}
