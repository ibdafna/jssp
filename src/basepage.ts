import { Router } from "./router";
import { StateManager } from "./statemanager";

export abstract class BasePage {
  constructor(routePath: string, containerElement: HTMLElement) {
    this.routePath = routePath;
    this.container = containerElement;
    this.stateManager = StateManager.getInstance();
    this.router = StateManager.getRouter();
  }

  /**
   * Any pre-render setup for the page should be done here
   */
  async pre(): Promise<boolean> {
    return Promise.resolve(false);
  }

  /**
   * This function is responsible for the actual HTML
   * rendering the page results in
   */
  abstract render(): void;

  /**
   * This is the page's destructor which is called when
   * the page is navigated away from. Any event handlers
   * etc should be unmounted here.
   */
  async post(): Promise<boolean> {
    this.container.innerHTML = "";
    return Promise.resolve(false);
  }

  protected routePath: string;
  protected container: HTMLElement;
  protected stateManager: StateManager;
  protected router: Router;
}

export interface IBasePage {
  new (routePath: string, containerElement: HTMLElement): BasePage;
}
