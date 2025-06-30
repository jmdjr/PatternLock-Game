import { ConsoleSystem } from "./services/console-ui/console-ui";
import { GlobalContainer } from "./services/di/di-container";

GlobalContainer.register('ConsoleSystem', ConsoleSystem);