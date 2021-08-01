import { BasePage, IBasePage } from "./basepage";

/**
 * Single Page Architecture Router
 */
export class Router {
  constructor(htmlContainer: HTMLElement) {
    this.container = htmlContainer;
    this.routes = new Map();
    this.currentPath = "/";
  }

  addRoute(routeObject: RouteObject) {
    const { routePath, routePage } = routeObject;
    this.routes.set(routePath, new routePage(routePath, this.container));
  }

  removeRoute(routePath: string) {
    if (this.routes.has(routePath)) {
      this.routes.delete(routePath);
    }
  }

  getRoutes() {
    return Array.from(this.routes);
  }

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
        this.routes.get(routePath).render();
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
