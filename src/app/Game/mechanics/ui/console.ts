type CommandHandler = (args: string[], game: Phaser.Scene) => string | Promise<string>;

interface ConsoleCommand {
  description: string;
  handler: CommandHandler;
}

export class GameConsole extends Phaser.GameObjects.Container {
  private inputText: Phaser.GameObjects.DOMElement;
  private outputText: Phaser.GameObjects.Text;
  private commands: Record<string, ConsoleCommand>;
  private history: string[] = [];
  private historyIndex: number = -1;

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
    });``
    this.inputText.setOrigin(0, 0);
    this.add(this.inputText);

    this.setSize(width, height);

    // Command registry
    this.commands = {
      help: {
        description: 'List available commands',
        handler: () => Object.entries(this.commands)
          .map(([cmd, { description }]) => `${cmd}: ${description}`).join('\n')
      },
      echo: {
        description: 'Echo input',
        handler: (args) => args.join(' ')
      },
      state: {
        description: 'Display game state',
        handler: (_, game) => JSON.stringify(game.data ? game.data.getAll() : {}, null, 2)
      },
      set: {
        description: 'Set game state variable. Usage: set key value',
        handler: (args, game) => {
          if (args.length < 2) return 'Usage: set key value';
          if (game.data) game.data.set(args[0], args.slice(1).join(' '));
          return `Set ${args[0]}`;
        }
      },
      exit: {
        description: 'Exit the console',
        handler: () => {
          this.hideConsole();
          return 'Console hidden';
        }
      }
      // Add more commands as needed
    };

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
    });
  }
  
  hideConsole() {
    this.inputText.setVisible(false);
    this.outputText.setVisible(false);
  }

  showConsole() {
    this.inputText.setVisible(true);
    this.outputText.setVisible(true);

    setTimeout(() => {
      (this.inputText.node as HTMLInputElement).focus();
    });
  }

  private async executeCommand(input: string) {
    this.print(`> ${input}`);
    const [cmd, ...args] = input.trim().split(/\s+/);
    const command = this.commands[cmd];
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
