import { Inject } from "../di/di-container";
import { CONSOLE_COMMANDS, ConsoleSystem } from "../console-system/console-system";

export class GameConsole extends Phaser.GameObjects.Container {
  private inputText: Phaser.GameObjects.DOMElement;
  private outputText: Phaser.GameObjects.Text;
  private history: string[] = [];
  private historyIndex: number = -1;

  @Inject('ConsoleSystem')
  private consoleSystem: ConsoleSystem;
  
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y);

    // Output area
    this.outputText = scene.add.text(0, 0, '', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#00ff00',
      padding: {
        top: 12
      },
      wordWrap: { width: width - 10 }
    }).setOrigin(0, 0);
    this.add(this.outputText);

    // Input area (HTML input for easier typing)
    this.inputText = scene.add.dom(0, 0, 'input', {
      width: `100%`,
      fontSize: '12pt',
      fontFamily: 'monospace',
      background: '#222',
      color: '#0f0',
      border: 'none',
      outline: 'none',
      padding: '4px'
    });
    this.inputText.setOrigin(0, 0);

    this.add(this.inputText);
    this.setSize(width, height);

    // Input event
    this.inputText.node.addEventListener('keydown', (evt: Event) => {
      if(!(evt instanceof KeyboardEvent)) return;

      if (evt.key === 'Enter') {
        const value = (this.inputText.node as HTMLInputElement).value;
        this.executeCommand(value);
        this.history.push(value);
        this.historyIndex = this.history.length;
        (this.inputText.node as HTMLInputElement).value = '';
      } else if (evt.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          (this.inputText.node as HTMLInputElement).value = this.history[this.historyIndex] || '';
        }
      } else if (evt.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          (this.inputText.node as HTMLInputElement).value = this.history[this.historyIndex] || '';
        } else {
          (this.inputText.node as HTMLInputElement).value = '';
        }
      }

      this.updateConsoleUI();
    });
    this.hideConsole();
  }

  hideConsole() {
    this.consoleSystem?.hideConsoleUI();
    this.updateConsoleUI();
  }

  showConsole() {
    this.consoleSystem?.showConsoleUI();
    this.updateConsoleUI();

    setTimeout(() => {
      (this.inputText.node as HTMLInputElement).focus();
    });
  }

  updateConsoleUI() {
    const visible = this.consoleSystem?.getConsoleUIStatus() ?? false;
    this.inputText.setVisible(visible);
    this.outputText.setVisible(visible);
  }

  private async executeCommand(input: string) {
    this.print(`> ${input}`);
    const [cmd, ...args] = input.trim().split(/\s+/);
    const command = CONSOLE_COMMANDS.get(cmd);
    if (!command) {
      this.print(`Unknown command: ${cmd}`);
      return;
    }
    try {
      const result = await command.handler(args, this.scene);
      if (result) this.print(result);
    } catch (e) {
      this.print(`Error: ${(e as Error).message}`);
    }
  }

  print(text: string) {
    this.outputText.text += text + '\n';
    // Optionally scroll output if too long
    const lines = this.outputText.text.split('\n');
    if (lines.length > 20) {
      this.outputText.text = lines.slice(-20).join('\n');
    }
  }
}
export { ConsoleSystem };

