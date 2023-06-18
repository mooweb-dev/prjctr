"use strict";

import { getRandomEmoji } from "./modules/emoji.js";
import { validate } from "./modules/validate.js";
import { setValueToArrayList } from "./modules/array.js";
import { setValueToSetList } from "./modules/set.js";

const input = document.querySelector("#input");
const button = document.querySelector("#button");

document.addEventListener("DOMContentLoaded", init);
button.addEventListener("click", handleButtonClick);

function init() {
  input.value = getRandomEmoji();
}

function handleButtonClick(e) {
  e.preventDefault();

  const value = input.value.trim();

  if (validate(value)) {
    setValueToArrayList(value);
    setValueToSetList(value);

    input.value = "";

    return;
  }

  alert("Error!");
}
