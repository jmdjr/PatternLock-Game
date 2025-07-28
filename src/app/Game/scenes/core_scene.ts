import ASSETS, { getAssetByType } from '../assets.data';
import Phaser, { Game } from 'phaser';

import Path, { CountRight, PathSequence } from '../mechanics/path/path';
import { ButtonPanel } from '../mechanics/button/buttonPanel';
import { GameConsole } from '../services/console-ui/console-ui';
import { Inject } from '../services/di/di.system';
import { UIBuilder } from '../mechanics/ui/uiFormatter';
import { LabeledButton } from '../mechanics/button/labeledButton';
import { UI_CONFIG_GAME_BOARD, UI_CONFIG_NEW_GAME_BUTTON, UI_CONFIG_PATH_GUESS_LABEL, UI_CONFIG_SHOW_SOLUTION_BUTTON, UI_CONFIG_TRIES_COLLECTION } from '../mechanics/ui/ui.config';
import { ScrollingListBox, ScrollingListConfig } from '../mechanics/scrolling-list-box/ScrollingListBox';
import { PathSequenceFeedbackEffect, PSFeedbackConfig } from '../mechanics/path/PathSequenceFeedbackEffect';

export enum GameEvents {
  ADD_GUESS = 'addGuess',
  RESET_GAME = 'resetGame',
  PATH_DRAWN_END = 'pathDrawnEnd',
  REPEAT_GUESS = 'repeatGuess',
  SHOW_SOLUTION = 'showSolution',
  PAUSE_ACTION = 'pauseAction',
  UNPAUSE_ACTION = 'unpauseAction',
}

export default class CoreScene extends Phaser.Scene {
  private panel: ButtonPanel;
  private solutionPath: Path;
  private psFeedback: PathSequenceFeedbackEffect;
  private isSolved: boolean = false;

  private _feedbackConfig: PSFeedbackConfig = {
    graphicSize: 32,
    startDelay: 300,
    duration: 200
  }

  private guessListConfig: ScrollingListConfig = {
    x: 0,
    y: 0,
    width: 300,
    height: 600,
    itemHeight: 64,
    backgroundColor: 0x333333,
    borderColor: 0x666666,
    borderWidth: 2,
    textStyle: {
      fontSize: '32pt',
      color: '#ffffff',
      fontFamily: 'Arial'
    },
    itemPadding: 10,
    scrollSpeed: 5,
    scrollBar: {
      width: 32
    }
  }

  private uiCreation: (() => void)[] = [
    () => { // Create the game console
      const console = new GameConsole(this, 0, 0, 800, 600);
      console.setName('gameDevConsole');
      this.add.existing(console);
      this.input.keyboard?.on('keydown', (event: Event) => {
        if (!(event instanceof KeyboardEvent)) return;
        if (event.key === '~') {
          console.showConsole();
        }
      });
    },

    () => { // Create the Previous Guess List
      this.guessList = new ScrollingListBox(this, this.guessListConfig)
        .setName(UI_CONFIG_TRIES_COLLECTION);

      this.add.existing(this.guessList);
      this._uiBuilder.addElement(UI_CONFIG_TRIES_COLLECTION, this.guessList.setPosition.bind(this.guessList));
      this.events.addListener(GameEvents.ADD_GUESS, async (item: PathSequence) => {
        if(this.isSolved) return;

        const count = this.guessList.countItems();
        let text = `Guess #${count + 1}`;
        if (CountRight(item, this.solutionPath.get) === this.solutionPath.get.length) {
          text = "Correct!";
          this.isSolved = true;
        }

        this.guessList.addItem({ id: `${count + 1}`, text, context: item });

        if (this.isSolved) {
          this.events.emit(GameEvents.PAUSE_ACTION);
          await new Promise(resolve => setTimeout(resolve, 2 * (this._feedbackConfig.duration + this._feedbackConfig.startDelay) * (item.length + 1)));
          this.events.emit(GameEvents.RESET_GAME);
        }
      });

      this.guessList.onItemClick((item, _) => {
        this.events.emit(GameEvents.REPEAT_GUESS, item.context);
      });

      this.events.addListener(GameEvents.RESET_GAME, () => {
        this.guessList.clearItems();
      });
    },

    () => { // Create the path answer label
      this.solutionPath = new Path();
      this.events.addListener(GameEvents.RESET_GAME, () => {
        this.isSolved = false;
        this.solutionPath.reset(Math.round(Math.random() * 2 + 5)); // Random length between 5 and 7
      });
    },

    () => { // Create the game button panel
      this.panel = new ButtonPanel(this, 0, 0).setName(UI_CONFIG_GAME_BOARD);
      this._uiBuilder.addElement(UI_CONFIG_GAME_BOARD, this.panel.setPosition.bind(this.panel));

      this.panel.addListener(GameEvents.PATH_DRAWN_END, (path: PathSequence) => {
        if (path.length > 2) {
          this.events.emit(GameEvents.ADD_GUESS, path);
        }
      });

      this.events.addListener(GameEvents.PAUSE_ACTION, () => {
        this.panel.ignoreActions = true;
      });

      this.events.addListener(GameEvents.UNPAUSE_ACTION, () => {
        this.panel.ignoreActions = false;
      });

      this.events.addListener(GameEvents.REPEAT_GUESS, (path: PathSequence) => {
        this.panel.setPath(path);
      });

      this.events.addListener(GameEvents.RESET_GAME, () => {
        this.panel.reset();
        this.events.emit(GameEvents.UNPAUSE_ACTION);
      });
    },

    () => { // Create the new Game button
      const newGameButton = new LabeledButton(this, getAssetByType(LabeledButton.TYPE), 0, 0, 'New Game')
        .setName(UI_CONFIG_NEW_GAME_BUTTON);
      newGameButton.set
        .down((button) => {
          this.events.emit(GameEvents.RESET_GAME);
          button.setTint(0x00FF00);
        })
        .up((button) => button.clearTint())
        .over((button) => button.setTint(0x009900))
        .out((button) => button.clearTint());

      this.add.existing(newGameButton);
      this._uiBuilder.addElement(UI_CONFIG_NEW_GAME_BUTTON, newGameButton.setPosition.bind(newGameButton));
    },

    () => { // Create the Show Solution button
      const showSolutionButton = new LabeledButton(this, getAssetByType(LabeledButton.TYPE), 0, 0, 'Solution')
        .setName(UI_CONFIG_SHOW_SOLUTION_BUTTON);
      showSolutionButton.set
        .down((button) => {
          this.events.emit(GameEvents.SHOW_SOLUTION);
          button.setTint(0x00FF00);
        })
        .up((button) => button.clearTint())
        .over((button) => button.setTint(0x009900))
        .out((button) => button.clearTint());

      this.add.existing(showSolutionButton);
      this._uiBuilder.addElement(UI_CONFIG_SHOW_SOLUTION_BUTTON, showSolutionButton.setPosition.bind(showSolutionButton));
    },

    () => { // Create the Accuracy Label
      this.accuracyLabel = this.add.text(0, 0, '', {
        fontSize: '42pt',
        color: '#ffffffff',
        align: 'center',
      }).setName(UI_CONFIG_PATH_GUESS_LABEL);
      this._uiBuilder.addElement(UI_CONFIG_PATH_GUESS_LABEL, this.accuracyLabel.setPosition.bind(this.accuracyLabel));
    },

    () => { // Reveal Pattern Feedback Effect
      this.psFeedback = new PathSequenceFeedbackEffect(this, this._feedbackConfig);

      this.events.addListener(GameEvents.ADD_GUESS, async (path: PathSequence) => {
        this.events.emit(GameEvents.PAUSE_ACTION);
        await this.psFeedback.run(this.solutionPath.get, path, this.panel.getButtonPositions());
        this.events.emit(GameEvents.UNPAUSE_ACTION);
      });

      this.events.addListener(GameEvents.REPEAT_GUESS, async (path: PathSequence) => {
        this.events.emit(GameEvents.PAUSE_ACTION);
        await this.psFeedback.run(this.solutionPath.get, path, this.panel.getButtonPositions());
        this.events.emit(GameEvents.UNPAUSE_ACTION);
      });

      this.events.addListener(GameEvents.RESET_GAME, () => {
        this.psFeedback.reset();
      });
    }
  ];

  @Inject(UIBuilder.name)
  private _uiBuilder: UIBuilder;
  guessList: ScrollingListBox;
  accuracyLabel: Phaser.GameObjects.Text;

  constructor() {
    super("CoreScene");
  }

  init() {
    this.data.set('debug', false); // Set debug mode
  }

  preload() {
    for (let asset of ASSETS) {
      this.load?.image(asset.type, asset.url);
    }
  }

  create() {
    this.uiCreation.forEach((create) => create());
    this._uiBuilder.buildUI();
  }

  override update(time: number, delta: number) {
    super.update(time, delta);
    // Update the visual path guess
    this.panel.update(this.input.x, this.input.y);
    this._setAccuracyLabel();
  }

  private _setAccuracyLabel() {
    if (this.panel.visualPath.length < 2) {
      this.accuracyLabel.setText(`Accuracy\n0/${this.solutionPath.get.length}`);
      return;
    }
    const accuracy = CountRight(this.panel.visualPath, this.solutionPath.get);
    this.accuracyLabel.setText(`Accuracy\n${accuracy}/${this.solutionPath.get.length}`);
  }
}