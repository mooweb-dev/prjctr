"use strict";

import { createElement } from "./createElement.js";

const setList = document.querySelector("#set");

// Можливо трішки костильно, але працює))) Дуууже мало часу :(
export function setValueToSetList(value) {
  const set = new Set();
  const setItems = setList.querySelectorAll("li");

  for (let i = 0; i < setItems.length; i++) {
    set.add(setItems[i].textContent);
  }

  if (!set.has(value)) {
    setList.append(createElement(value));
  }
}
