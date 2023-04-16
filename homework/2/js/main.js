function validateDuration(duration) {
  if (!duration) {
    return false;
  }

  const durationToString = duration?.toString().trim();
  const validDurations = ["days", "hours", "minutes", "seconds"];

  return validDurations.includes(durationToString);
}

function validateDateFormat(date) {
  const dateToValidate = Date.parse(date);
  const isInvalidDate = isNaN(dateToValidate);

  return !isInvalidDate;
}

// 1
function durationBetweenDates(
  startDate = "20 Apr 2005",
  endDate = "20 Apr 2023",
  durationValue = "days"
) {
  if (!validateDateFormat(startDate) || !validateDateFormat(endDate)) {
    return "Invalid date";
  }

  if (!validateDuration(durationValue)) {
    return "Invalid duration";
  }

  let duration;

  switch (durationValue) {
    case "days": {
      duration = 1000 * 60 * 60 * 24;
      break;
    }
    case "hours": {
      duration = 1000 * 60 * 60;
      break;
    }
    case "minutes": {
      duration = 1000 * 60;
      break;
    }
    default: {
      duration = 1000;
    }
  }

  const delta = Math.abs(new Date(startDate) - new Date(endDate));
  const deltaByDuration = delta / duration;

  return `${deltaByDuration} ${durationValue}`;
}

durationBetweenDates("02 Aug 1985", "03 Aug 1985", "seconds"); // поверне '86400 seconds'
durationBetweenDates("31 Jan 2022", "03 Feb 2021", "days"); // поверне '362 days'

// 2
const priceData = {
  Apples: "23.4",
  BANANAS: "48",
  oRAngGEs: "48.7584",
};

function optimizer(data) {
  const dataIsInvalid =
    !data || Array.isArray(data) || typeof data !== "object";

  if (dataIsInvalid) {
    return "Invalid data";
  }

  let objectToArray = Object.entries(data);
  let optimizedObject = objectToArray.map((item) => {
    return [item[0].toLowerCase(), parseFloat(item[1]).toFixed(2)];
  });

  return Object.fromEntries(optimizedObject);
}

let updatedPriceData = optimizer(priceData);
console.log(updatedPriceData); // {apples: '23.40', bananas: '48.00', oranges: '48.76'}

// 3
function recursiveOddSumTo(number) {
  const numberIsInvalid = typeof number !== "number" || isNaN(number);

  if (numberIsInvalid) {
    return "Invalid number";
  }

  if (number <= 0) {
    return 0;
  }

  if (number % 2 === 0) {
    return recursiveOddSumTo(number - 1);
  }

  return number + recursiveOddSumTo(number - 2);
}

console.log(recursiveOddSumTo(1)); // 1
console.log(recursiveOddSumTo(10)); // 25

function iterativeOddSumTo(number) {
  const numberIsInvalid = typeof number !== "number" || isNaN(number);

  if (numberIsInvalid) {
    return "Invalid number";
  }

  let result = 0;

  for (let i = 1; i < number + 1; i++) {
    if (i % 2 !== 0) {
      result += i;
    }
  }

  return result;
}

console.log(iterativeOddSumTo(1)); // 1
console.log(iterativeOddSumTo(10)); // 25
