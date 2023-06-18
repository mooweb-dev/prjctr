"use strict";

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const arrayList = document.querySelector("#array");
const setList = document.querySelector("#set");
const emojis = ["🐮", "🐯", "🐼", "🐨", "🐵", "🐷", "🐸"];

document.addEventListener("DOMContentLoaded", init);
button.addEventListener("click", handleButtonClick);

function init() {
  input.value = getRandomEmoji();
}

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function validateInput(value) {
  return value !== "" && value !== undefined && value !== null;
}

function createElement(value) {
  const element = document.createElement("li");
  element.textContent = value;

  return element;
}

function setValueToArrayList(value) {
  arrayList.append(createElement(value));
}

// Можливо трішки костильно, але працює))) Дуууже мало часу :(
function setValueToSetList(value) {
  const set = new Set();
  const setItems = setList.querySelectorAll("li");

  for (let i = 0; i < setItems.length; i++) {
    set.add(setItems[i].textContent);
  }

  console.log(set);

  if (!set.has(value)) {
    setList.append(createElement(value));
  }
}

function handleButtonClick(e) {
  e.preventDefault();

  const value = input.value.trim();

  if (validateInput(value)) {
    setValueToArrayList(value);
    setValueToSetList(value);

    input.value = "";

    return;
  }

  alert("Error!");
}
