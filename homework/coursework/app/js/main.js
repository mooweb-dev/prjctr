"use strict";

const submitBtn = document.querySelector(".difference__submit");

const presetBtns = document.querySelectorAll("[name=preset]");
const clearPresetBtn = document.querySelector("#clearPreset");

const selects = document.querySelectorAll("select");

const startDateField = document.querySelector("#startDate");
const endDateField = document.querySelector("#endDate");

const historyWrapper = document.querySelector(".difference__history-table");

const HISTORY_STORAGE_KEY = "history";

const MESSAGES = {
  ERROR: "Перевірте правильність заповнення форми!",
};

const DISPLAY_FORMATS = {
  STORAGE: "storage",
};

const PERIOD_TITLES = {
  DAYS: "Дні",
  HOURS: "Години",
  MINUTES: "Хвилини",
  SECONDS: "Секунди",
};

const TYPE_TITLES = {
  ALL: "Всі дні",
  WEEKDAY: "Будні дні",
  WEEKEND: "Вихідні дні",
};

const dataSetups = {
  startDate: "",
  endDate: "",
  preset: "",
  type: "all",
  period: "days",
  total: 0,
};

document.addEventListener("DOMContentLoaded", init);

submitBtn.addEventListener("click", handleClickSubmit);

clearPresetBtn.addEventListener("click", handleClickClearPresetBtn);
presetBtns.forEach((preset) => {
  preset.addEventListener("change", changePreset);
});

selects.forEach((preset) => {
  preset.addEventListener("change", changeSelect);
});

startDateField.addEventListener("input", changeStartDate);
endDateField.addEventListener("input", changeEndDate);

// global
function init() {
  const history = getFromStorage(HISTORY_STORAGE_KEY);

  history.forEach((item) => {
    createHistory(item, DISPLAY_FORMATS.STORAGE);
  });
}

function handleClickSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    dataSetups.total = calculateDays();
    createHistory(dataSetups);
    addHistoryToStorage(dataSetups);

    resetState();
    return;
  }

  alert(MESSAGES.ERROR);
}

function validateForm() {
  const isValidStartDate = isValidDate(dataSetups.startDate);
  const isValidEndDate = isValidDate(dataSetups.endDate);

  const isValidDates =
    new Date(dataSetups.endDate) > new Date(dataSetups.startDate);

  return isValidStartDate && isValidEndDate && isValidDates;
}

function resetState() {
  resetDate("startDate", startDateField);
  resetDate("endDate", endDateField);
  toggleActivePresets();
  dataSetups.total = 0;
}

function getTimePattern(pattern) {
  switch (pattern) {
    case "days": {
      return 1000 * 60 * 60 * 24;
    }
    case "hours": {
      return 1000 * 60 * 60;
    }
    case "minutes": {
      return 1000 * 60;
    }
    case "seconds": {
      return 1000;
    }
    default: {
      return 1;
    }
  }
}

function isValidDate(value) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const isValid = dateRegex.test(value);

  return isValid;
}

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function resetDate(date, field) {
  dataSetups[date] = "";
  field.value = dataSetups[date];

  if (date === "endDate") {
    if (dataSetups.startDate.length <= 0) {
      field.setAttribute("disabled", true);
    }
  }
}

function calculateDays() {
  const { startDate, endDate, type } = dataSetups;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const days = {
    weekday: 0,
    weekend: 0,
    total: 0,
  };

  const dayPattern = getTimePattern("days");

  for (let i = start; i <= end; i += dayPattern) {
    const comparingDate = new Date(i);
    const isWeekend =
      comparingDate.getDay() === 6 || comparingDate.getDay() === 0;
    const currentWeekDay = isWeekend ? "weekend" : "weekday";

    days[currentWeekDay] += 1;
  }

  days.total = days["weekend"] + days["weekday"];

  if (type === "weekday") {
    return calculateDaysTime(days["weekday"]);
  }

  if (type === "weekend") {
    return calculateDaysTime(days["weekend"]);
  }

  return calculateDaysTime(days["total"]);
}

function calculateDaysTime(value) {
  const { period } = dataSetups;
  return (value * getTimePattern("days")) / getTimePattern(period);
}

function createHistory(history, format) {
  const tableRow = document.createElement("tr");

  for (let item in history) {
    const isValidValue = item !== "preset";

    if (isValidValue) {
      const tableCell = document.createElement("td");
      let content = history[item];

      if (item === "period") {
        const periodTitle = history[item].toUpperCase();
        content = PERIOD_TITLES[periodTitle];
      }

      if (item === "type") {
        const typeTitle = history[item].toUpperCase();
        content = TYPE_TITLES[typeTitle];
      }

      tableCell.textContent = content;
      tableRow.append(tableCell);
    }
  }

  if (format === DISPLAY_FORMATS.STORAGE) {
    historyWrapper.append(tableRow);
    return;
  }

  historyWrapper.prepend(tableRow);
}

function getFromStorage(key) {
  const items = localStorage.getItem(key);

  if (!items) {
    return [];
  }

  return JSON.parse(items);
}

function setToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addHistoryToStorage(value) {
  const history = getFromStorage(HISTORY_STORAGE_KEY);

  history.unshift(value);

  if (history.length > 10) {
    history.pop();
  }

  setToStorage(HISTORY_STORAGE_KEY, history);
}

// start date
function changeStartDate(e) {
  const field = e.target;
  const value = field.value;
  const currentDateField = field.id;

  resetCheckedPresets();

  if (!isValidDate(value)) {
    dataSetups[currentDateField] = "";

    resetDate("endDate", endDateField);
    toggleActivePresets();

    return;
  }

  dataSetups[currentDateField] = value;
  toggleActivePresets();
  endDateField.removeAttribute("disabled");
}

// endDate
function changeEndDate(e) {
  const field = e.target;
  const value = field.value;
  const currentDateField = field.id;

  resetCheckedPresets();

  if (!isValidDate(value)) {
    dataSetups[currentDateField] = "";

    return;
  }

  dataSetups[currentDateField] = value;
}

// presets
function handleClickClearPresetBtn(e) {
  e.preventDefault();
  resetDate("endDate", endDateField);
  resetCheckedPresets();
}

function changePreset(e) {
  const value = e ? e.target.value : "";
  dataSetups.preset = value;

  setPreset(value);
}

function setPreset(preset) {
  const currentStartDate = new Date(dataSetups.startDate);
  const presetDate = new Date(currentStartDate);

  if (!preset) {
    return;
  }

  if (preset === "week") {
    presetDate.setDate(currentStartDate.getDate() + 7);
  }

  if (preset === "month") {
    presetDate.setMonth(presetDate.getMonth() + 1);

    if (currentStartDate.getDate() > presetDate.getDate()) {
      presetDate.setDate(0);
    }
  }

  dataSetups.endDate = formatDate(presetDate);
  endDateField.value = dataSetups.endDate;
}

function resetCheckedPresets() {
  changePreset();

  presetBtns.forEach((preset) => {
    if (preset.checked) {
      preset.checked = false;
    }
  });
}

function toggleActivePresets() {
  if (dataSetups.startDate.length <= 0) {
    resetDate("endDate", endDateField);
    resetCheckedPresets();

    presetBtns.forEach((preset) => {
      preset.setAttribute("disabled", true);
    });

    return;
  }

  presetBtns.forEach((preset) => {
    if (preset.getAttribute("disabled")) {
      preset.removeAttribute("disabled");
    }
  });
}

// select
function changeSelect(e) {
  const value = e.target.value;
  const currentType = e.target.id;

  dataSetups[currentType] = value;
}
