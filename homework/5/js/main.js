"use strict";

// тут зробив 4 різні варіанти отримання DOM елементу
const body = document.getElementsByTagName("body")[0];
const switcherBtn = document.getElementById("switcherBtn");
const switcherLogs = document.getElementsByClassName("switcher__logs")[0];
const filterBtns = document.querySelectorAll("[data-action]");

init();

const STORAGE_LOGS_KEY = "logs";
const STORAGE_MODE_KEY = "isDark";

const modeData = {
  isDark: getFromStorage(STORAGE_MODE_KEY)
    ? getFromStorage(STORAGE_MODE_KEY)
    : false,

  modes: {
    dark: {
      isDarkMode: true,
      actionTitle: "Turn on",
      bodyClass: "is-dark",
    },
    light: {
      isDarkMode: false,
      actionTitle: "Turn off",
    },
  },
};

const FILTER_LOGS_ACTION = {
  ALL: "all",
  TURN_OFF: "turn-off",
  TURN_ON: "turn-on",
};

function init() {
  document.addEventListener("DOMContentLoaded", load);
  switcherBtn.addEventListener("click", changeMode);
  filterBtns.forEach((item) => item.addEventListener("click", filterLogs));
}

function load() {
  setButtonData();
  changePageBG();
  loadLogs();
}

function getCurrentMode() {
  return modeData.isDark ? modeData.modes.dark : modeData.modes.light;
}

function getTime() {
  const date = new Date();

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function setButtonData() {
  switcherBtn.textContent = getCurrentMode().actionTitle;
}

function loadLogs() {
  const logs = getFromStorage(STORAGE_LOGS_KEY);

  logs.forEach((log) => {
    createLog(log.title, log.time);
  });
}

function createLog(title, time) {
  const li = document.createElement("li");

  li.setAttribute("data-action", title.toLowerCase().replace(" ", "-"));
  li.textContent = `Last ${title.toLowerCase()}: ${time}`;

  switcherLogs.append(li);
}

function changePageBG() {
  const { dark } = modeData.modes;

  if (getCurrentMode().isDarkMode) {
    body.classList.add(getCurrentMode().bodyClass);
    return;
  }

  if (body.className.includes(dark.bodyClass)) {
    body.classList.remove(dark.bodyClass);
  }
}

function getFromStorage(key) {
  const items = localStorage.getItem(key);

  if (key === STORAGE_LOGS_KEY && !items) {
    return [];
  }

  if (!items) {
    return null;
  }

  return JSON.parse(items);
}

function setToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addLogToStorage(time) {
  const logs = getFromStorage(STORAGE_LOGS_KEY);
  logs.push({ title: getCurrentMode().actionTitle, time: time });
  setToStorage(STORAGE_LOGS_KEY, logs);
}

function filterLogs({ e, filter }) {
  const filterAction = filter ? filter : this.dataset.action;
  const currentBtn = document.querySelector(`[data-action=${filterAction}]`);

  filterBtns.forEach(function (item) {
    item.classList.remove("active");
  });

  currentBtn.classList.add("active");

  if (filterAction === FILTER_LOGS_ACTION.ALL) {
    switcherLogs.querySelectorAll(".hidden").forEach(function (item) {
      item.classList.remove("hidden");
    });

    return;
  }

  switcherLogs.querySelectorAll("li").forEach(function (item) {
    if (item.getAttribute("data-action") === filterAction) {
      if (item.className.includes("hidden")) {
        item.classList.remove("hidden");
      }

      return;
    }

    item.classList.add("hidden");
  });
}

function changeMode() {
  const time = getTime();

  addLogToStorage(time);
  createLog(getCurrentMode().actionTitle, time);
  filterLogs({ filter: FILTER_LOGS_ACTION.ALL });

  modeData.isDark = !modeData.isDark;

  setToStorage(STORAGE_MODE_KEY, modeData.isDark);

  setButtonData();
  changePageBG();
}
