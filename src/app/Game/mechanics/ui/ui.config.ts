export interface UIConfig {
  height: number;
  width: number;
  backgroundColor: string;
  ui: {
    key: string;
    x: number;
    y: number;
  }[];
}

export type UI_CONFIG_KEY = "pathGuess" | "title" | "revealedPattern" | "gameBoard" | "pauseButton" | "helpButton" | "newGameButton";
