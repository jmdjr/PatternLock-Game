import { GlobalContainer } from "./di-container";

export function Inject(token: string) {
  return function (target: any, propertyKey: string) {
    let value: any;
    const getter = function () {
      if (!value) {
        value = GlobalContainer.resolve(token);
      }
      return value;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
}