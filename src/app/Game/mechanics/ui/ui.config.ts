export interface GameConfig {
  height: number;
  width: number;
  backgroundColor: string;
}

export type UI_CONFIG_TITLE_TYPE = 'title';
export type UI_CONFIG_REVEALED_PATTERN_TYPE = 'revealedPattern';
export type UI_CONFIG_PATH_ANSWER_TYPE = 'pathAnswer';
export type UI_CONFIG_PATH_GUESS_LABEL_TYPE = 'pathGuessLabel';
export type UI_CONFIG_GAME_BOARD_TYPE = 'gameBoard';
export type UI_CONFIG_GAME_DESCRIPTION_TYPE = 'gameDescription';
export type UI_CONFIG_NEW_GAME_BUTTON_TYPE = 'newGameButton';
export type UI_CONFIG_GAME_UI_BUTTON_GROUP_TYPE = 'gameUIButtonGroup';
export type UI_CONFIG_TRIES_COLLECTION_TYPE = 'triesCollection';
export type UI_CONFIG_TRIES_LEFT_LABEL_TYPE = 'triesLeftLabel';

export const UI_CONFIG_TITLE: UI_CONFIG_TITLE_TYPE = 'title';
export const UI_CONFIG_REVEALED_PATTERN: UI_CONFIG_REVEALED_PATTERN_TYPE = 'revealedPattern';
export const UI_CONFIG_PATH_ANSWER: UI_CONFIG_PATH_ANSWER_TYPE = 'pathAnswer';
export const UI_CONFIG_PATH_GUESS_LABEL: UI_CONFIG_PATH_GUESS_LABEL_TYPE = 'pathGuessLabel';
export const UI_CONFIG_GAME_BOARD: UI_CONFIG_GAME_BOARD_TYPE = 'gameBoard';
export const UI_CONFIG_GAME_DESCRIPTION: UI_CONFIG_GAME_DESCRIPTION_TYPE = 'gameDescription';
export const UI_CONFIG_NEW_GAME_BUTTON: UI_CONFIG_NEW_GAME_BUTTON_TYPE = 'newGameButton';
export const UI_CONFIG_GAME_UI_BUTTON_GROUP: UI_CONFIG_GAME_UI_BUTTON_GROUP_TYPE = 'gameUIButtonGroup';
export const UI_CONFIG_TRIES_COLLECTION: UI_CONFIG_TRIES_COLLECTION_TYPE = 'triesCollection';
export const UI_CONFIG_TRIES_LEFT_LABEL: UI_CONFIG_TRIES_LEFT_LABEL_TYPE = 'triesLeftLabel';

export type UI_CONFIG_KEY = UI_CONFIG_TITLE_TYPE 
          | UI_CONFIG_REVEALED_PATTERN_TYPE 
          | UI_CONFIG_PATH_ANSWER_TYPE 
          | UI_CONFIG_PATH_GUESS_LABEL_TYPE 
          | UI_CONFIG_GAME_BOARD_TYPE 
          | UI_CONFIG_GAME_DESCRIPTION_TYPE 
          | UI_CONFIG_NEW_GAME_BUTTON_TYPE 
          | UI_CONFIG_GAME_UI_BUTTON_GROUP_TYPE 
          | UI_CONFIG_TRIES_COLLECTION_TYPE 
          | UI_CONFIG_TRIES_LEFT_LABEL_TYPE;

export type UI_CONFIG_TYPE = {
  key: UI_CONFIG_KEY;
  x: number;
  y: number;
};

export const UI_CONFIG: UI_CONFIG_TYPE[] = [
  {
    key: UI_CONFIG_TITLE,
    x: 360,
    y: 100
  },
  {
    key: UI_CONFIG_REVEALED_PATTERN,
    x: 360,
    y: 300
  },
  {
    key: UI_CONFIG_PATH_ANSWER,
    x: 32,
    y: 117
  },
  {
    key: UI_CONFIG_PATH_GUESS_LABEL,
    x: 44,
    y: 210
  },
  {
    key: UI_CONFIG_GAME_BOARD,
    x: 132,
    y: 725
  },
  {
    key: UI_CONFIG_GAME_DESCRIPTION,
    x: 16,
    y: 100
  },
  {
    key: UI_CONFIG_NEW_GAME_BUTTON,
    x: 120,
    y: 100
  },
  {
    key: UI_CONFIG_TRIES_COLLECTION,
    x: 354,
    y: 210
  },
  {
    key: UI_CONFIG_TRIES_LEFT_LABEL,
    x: 16,
    y: 50
  }
]