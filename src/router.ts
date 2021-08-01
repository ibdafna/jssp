import { BasePage, IBasePage } from "./basepage";

/**
 * Single Page Architecture Router
 */
export class Router {
  constructor(htmlContainer: HTMLElement) {
    this.container = htmlContainer;
    this.routes = new Map();
    this.currentPath = "/";
    this.setupListeners();
    this.setupPopstate();
  }

  /**
   * Adds an event listener to make sure hrefs
   * are intercepted correctly
   */
  private setupListeners() {
    document.body.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.nodeName === "A") {
        if (target.href !== undefined) {
          e.preventDefault();
          const url = new URL(target.href);
          if (this.routes.has(url.pathname)) {
            history.pushState({}, url.pathname, url.toString());
            this.navigateTo(url.pathname);
          }
        }
      }
    });
  }

  private setupPopstate() {
    window.addEventListener("popstate", (e: Event) => {
      if (this.routes.has(location.pathname)) {
        this.navigateTo(location.pathname);
      }
    });
  }

  /**
   * Add multiple routes to Router
   * @param routeObjects
   */
  addRoutes(routeObjects: RouteObject[]) {
    for (const routeObj of routeObjects) {
      this.addRoute(routeObj);
    }
  }

  /**
   * Add a route
   * @param routeObject
   */
  addRoute(routeObject: RouteObject) {
    const { routePath, routePage } = routeObject;
    this.routes.set(routePath, new routePage(routePath, this.container));
  }

  /**
   * Remove a route
   * @param routePath
   */
  removeRoute(routePath: string) {
    if (this.routes.has(routePath)) {
      this.routes.delete(routePath);
    }
  }

  /**
   * Returns a list of all routes
   * @returns
   */
  getRoutes() {
    return Array.from(this.routes);
  }

  /**
   * Renders the page associated with the target route
   * @param routePath
   */
  async navigateTo(routePath: string) {
    if (this.routes.has(routePath)) {
      // Call clean up routine of existing page
      this.routes.get(this.currentPath)!.post();
      // Change path pointer
      this.currentPath = routePath;
      // Pre-render
      const skipRender = await this.routes.get(routePath)!.pre();
      // Render page
      if (!skipRender) {
        this.routes.get(routePath)!.render();
      }
    }
  }

  routes: Map<String, BasePage>;
  container: HTMLElement;
  currentPath: string;
}

export type RouteObject = {
  routePath: string;
  routePage: IBasePage;
};
