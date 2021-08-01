export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function g(identifier: string): HTMLElement {
  return document.querySelector(identifier);
}

export function c(tagName: string, tagObject: any) {
  const { ...attrs } = tagObject;

  const htmlObject = tagName
    ? document.createElement(tagName)
    : document.createElement("div");

  for (const attr in attrs) {
    htmlObject[attr] = attrs[attr];
  }

  return htmlObject;
}

export function addChildren(
  parentElement: HTMLElement,
  childrenList: HTMLElement[]
): void {
  for (const child of childrenList) {
    parentElement.appendChild(child);
  }
}

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
