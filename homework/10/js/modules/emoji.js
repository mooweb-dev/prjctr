"use strict";

const emojis = ["🐮", "🐯", "🐼", "🐨", "🐵", "🐷", "🐸"];

export function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}
