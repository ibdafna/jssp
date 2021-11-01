import { Router } from "./router";

export class StateManager {
  private constructor() {
    this.stateMap = new Map();
  }

  public static getInstance(): StateManager {
    if (!this.instance) {
      StateManager.instance = new StateManager();
    }

    return this.instance;
  }

  public static setRouter(router: Router) {
    if (!StateManager.router) {
      StateManager.router = router;
    }
  }

  public static getRouter() {
    return StateManager.router;
  }

  public addItem(obj: [string, any]): any {
    return this.stateMap.set(...obj);
  }

  public getItem(key: string): any {
    return this.stateMap.get(key);
  }

  public hasItem(key: string): boolean {
    return this.stateMap.has(key);
  }

  private stateMap: Map<string, any>;
  private static instance: StateManager;
  private static router: Router;
}
