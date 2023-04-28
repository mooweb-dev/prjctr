/*
  Validate functions
*/

const validateNumber = (item) => {
  return !isNaN(item) && item !== null && typeof item === "number";
};

const validateSortArgs = (item) => {
  return typeof item === "string" && item.trim("").length > 0 && item !== null;
};

const validateSortObject = (item) => {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
};

/*
  Primary code
*/

// 1
console.log(addThemAll(2, 4)); // 6*
console.log(addThemAll(1, 2, 3, 4)); // 10*
console.log(addThemAll(5, 5, 10)); // 20*

function addThemAll(...numbers) {
  const invalidNumbers = numbers.filter((item) => !validateNumber(item));

  if (invalidNumbers.length > 0) {
    return "Invalid value!";
  }

  const numbersSum = numbers.reduce((acc, nextItem) => acc + nextItem, 0);

  return numbersSum;
}

// 2
console.log(multiply(5)(5)); // 25*
console.log(multiply(2)(-2)); // -4*
console.log(multiply(4)(3)); // 12*

function multiply(a) {
  return (b) =>
    validateNumber(a) && validateNumber(b) ? a * b : "Invalid number";
}

// 3
const movies = [
  {
    movieName: "The Thing",
    releaseYear: 1982,
    directedBy: "Carpenter",
    runningTimeInMinutes: 109,
  },
  {
    movieName: "Aliens",
    releaseYear: 1986,
    directedBy: "Cameron",
    runningTimeInMinutes: 137,
  },
  {
    movieName: "Men in Black",
    releaseYear: 1997,
    directedBy: "Sonnenfeld",
    runningTimeInMinutes: 98,
  },
  {
    movieName: "Predator",
    releaseYear: 1987,
    directedBy: "McTiernan",
    runningTimeInMinutes: 107,
  },
];

function byProperty(property, direction) {
  if (!validateSortArgs(property) || !validateSortArgs(direction)) {
    return "Invalid argument!";
  }

  return (a, b) => {
    const validateSort =
      validateSortObject(a) &&
      validateSortObject(b) &&
      property in a &&
      property in b;

    if (validateSort) {
      switch (direction) {
        case ">": {
          return a[property] > b[property] ? 1 : -1;
        }

        default: {
          return a[property] > b[property] ? -1 : 1;
        }
      }
    } else {
      return "Invalid value!";
    }
  };
}

console.log(movies.sort(byProperty("releaseYear", ">"))); // виведе масив фільмів посортованих по року випуску, від старішого до новішого*
console.log(movies.sort(byProperty("runningTimeInMinutes", "<"))); // виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого*
console.log(movies.sort(byProperty("movieName", ">"))); // виведе масив фільмів посортованих по назві, в алфавітному порядку*
