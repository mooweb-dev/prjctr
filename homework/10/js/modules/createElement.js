"use strict";

export function createElement(value) {
  const element = document.createElement("li");
  element.textContent = value;

  return element;
}
