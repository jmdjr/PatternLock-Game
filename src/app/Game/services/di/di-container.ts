type Constructor<T = any> = new (...args: any[]) => T;

export class DIContainer {
  private providers = new Map<string, Constructor>();
  _singletons = new Map<string, any>();

  register<T>(token: string, provider: Constructor<T>) {
    this.providers.set(token, provider);
  }

  resolve<T>(token: string): T {
    if (GlobalContainer._singletons.has(token)) {
      return GlobalContainer._singletons.get(token);
    }

    const provider = this.providers.get(token);
    if (!provider) throw new Error(`No provider for ${token}`);
    
    const instance = new provider();
    GlobalContainer._singletons.set(token, instance);
    return instance;
  }
}

export function Inject(serviceKey: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return GlobalContainer.resolve(serviceKey);
      }
    });
  }
}

// Export a global container for convenience
export const GlobalContainer = new DIContainer();