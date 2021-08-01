import { BasePage, Utils } from "../../../src";

const { c, addChildren } = Utils;

export class ContactPage extends BasePage {
  constructor(routePath: string, containerElement: HTMLElement) {
    super(routePath, containerElement);
  }

  async pre(): Promise<boolean> {
    console.log("I'm called before the page renders");
    // Resolved value tells the router whether to skip
    // calling render() function of page.
    return Promise.resolve(false);
  }

  render(): void {
    const contentPage = c("div", {
      className: "contentPage flex",
    });
    addChildren(this.container, [contentPage]);

    const introTitle = c("h1", {
      className: "jumboTitle",
      innerText: "Welcome to the Contact Page ✨",
    });

    addChildren(contentPage, [introTitle]);
  }
}
