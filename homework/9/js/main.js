"use strict";

// interator
const makeIterator = {
  [Symbol.iterator]() {
    let current = 1;

    const checkMultiplicity = (index) => {
      if (index % 15 === 0) {
        return "FizzBuzz";
      }

      if (index % 3 === 0) {
        return "Fizz";
      }

      if (index % 5 === 0) {
        return "Buzz";
      }

      return index;
    };

    return {
      next() {
        if (current <= 100) {
          const result = {
            value: checkMultiplicity(current),
          };

          current++;

          return result;
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const value of makeIterator) {
  // console.log(value);
}

// generator
function* makeGenerator() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      yield "FizzBuzz";
    } else if (i % 3 === 0) {
      yield "Fizz";
    } else if (i % 5 === 0) {
      yield "Buzz";
    } else {
      yield i;
    }
  }
}

const generator = makeGenerator();

for (const value of generator) {
  // console.log(value);
}

// Generate numbers
function* generateRandomNumbers(max, quantity) {
  let counter = 0;

  while (counter < quantity) {
    yield Math.floor(Math.random() * (max + 1));

    counter++;
  }
}

const generatedNumbers = generateRandomNumbers(100, 10);

for (const randomNumber of generatedNumbers) {
  // console.log(randomNumber);
}
