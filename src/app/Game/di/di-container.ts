type Constructor<T = any> = new (...args: any[]) => T;

export class DIContainer {
  private providers = new Map<string, Constructor>();

  register<T>(token: string, provider: Constructor<T>) {
    this.providers.set(token, provider);
  }

  resolve<T>(token: string): T {
    const provider = this.providers.get(token);
    if (!provider) throw new Error(`No provider for ${token}`);
    return new provider();
  }
}

// Export a global container for convenience
export const GlobalContainer = new DIContainer();