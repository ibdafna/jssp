/**
 * Function to generate a unique hash
 * @returns a unique hash
 */
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Helper function to retrieve a HTML element from the DOM
 * @param identifier
 * @returns
 */
export function g(identifier: string): HTMLElement | null {
  return document.querySelector(identifier);
}

/**
 * Helper function to create DOM elements
 * @param tagName semantic HTML element type (default: div)
 * @param tagObject Additional arguments object
 * @returns a new HTMLElement
 */
export function c(tagName: string, tagObject: any) {
  const { ...attrs } = tagObject;
  const htmlObject = tagName
    ? document.createElement(tagName)
    : document.createElement("div");

  for (const attr in attrs) {
    (htmlObject as any)[attr] = attrs[attr];
  }

  return htmlObject;
}

/**
 * Helper function to add a number of children to a parent node
 * @param parentElement
 * @param childrenList
 */
export function addChildren(
  parentElement: HTMLElement,
  childrenList: HTMLElement[]
): void {
  for (const child of childrenList) {
    parentElement.appendChild(child);
  }
}

/**
 * Helper function to add an event listener to a target element
 * @param target
 * @param type
 * @param callback
 * @param listenerArgs
 * @param addlArgs
 */
export function event(
  target: HTMLElement,
  type: string,
  callback: (e: Event, addlArgs?: CallbackCargo) => void,
  listenerArgs?: { [key: string]: string | boolean },
  addlArgs?: CallbackCargo
) {
  target.addEventListener(
    type,
    (e) => {
      callback(e, addlArgs);
    },
    listenerArgs
  );
}

type CallbackCargo = HTMLElement | HTMLElement[];

document.createElement("div");
