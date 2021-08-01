import { Utils, BasePage, Router, RouteObject } from "../../src";
import "../style.css";

// Import pages
import { AboutPage, ContactPage } from "./pages";

// Extract utility functions from Utils namespace
const { c, g, addChildren } = Utils;

class IndexPage extends BasePage {
  constructor(routePath, containerElement) {
    super(routePath, containerElement);
  }

  render() {
    const contentPage = c("div", {
      className: "contentPage flex",
    });
    addChildren(this.container, [contentPage]);

    const jumboTitle = c("h1", {
      className: "jumboTitle",
      innerText: "Welcome to the Index Page ❤️",
    });

    addChildren(contentPage, [jumboTitle]);
  }
}

function boostrap() {
  // Setting up container
  const body = g("body");
  const masterContainer = c("div", { className: "masterContainer" });
  Utils.addChildren(body, [masterContainer]);

  // Setting up dynamic content container (non-navbar)
  const container = c("div", { className: "appContainer" });

  // Setting up router and adding routes
  const router = new Router(container);
  const routeObjects = [
    { routePath: "/", routePage: IndexPage } as RouteObject,
    { routePath: "/contact", routePage: ContactPage } as RouteObject,
    { routePath: "/about", routePage: AboutPage } as RouteObject,
  ];
  router.addRoutes(routeObjects);

  // Setting up and adding navbar to main container
  const navBar = c("div", { className: "navBar flex hpad" });
  const logo = c("a", {
    className: "logo link",
    innerText: "JSSP",
    href: "/",
  });
  const aboutPageLink = c("a", {
    className: "link",
    innerText: "About",
    href: "/about",
  });

  const contactLinkPage = c("a", {
    className: "link",
    innerText: "Contact",
    href: "/contact",
  });

  const linksBar = c("div", { className: "flex linkContainer" });
  addChildren(linksBar, [aboutPageLink, contactLinkPage]);
  addChildren(navBar, [logo, linksBar]);
  addChildren(masterContainer, [navBar, container]);

  // Navigating to the index page
  router.navigateTo("/");
}

window.onload = boostrap;
