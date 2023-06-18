"use strict";

import { createElement } from "./createElement.js";

const arrayList = document.querySelector("#array");

export function setValueToArrayList(value) {
  arrayList.append(createElement(value));
}
