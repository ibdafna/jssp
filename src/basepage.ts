export abstract class BasePage {
  constructor(routePath: string, containerElement: HTMLElement) {
    this.routePath = routePath;
    this.container = containerElement;
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
}

export interface IBasePage {
  new (routePath: string, containerElement: HTMLElement): BasePage;
}
