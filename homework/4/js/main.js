// 1
detonatorTimer(3);

function detonatorTimer(delay) {
  const intervalRealisation = setInterval(() => {
    if (delay > 0) {
      console.log(delay);
      --delay;
    } else {
      console.log("BOOM!");
      clearInterval(intervalRealisation);
    }
  }, 1000);
}

function detonatorTimer(delay) {
  function timeoutRealisation() {
    if (delay > 0) {
      console.log(delay);
      --delay;
      setTimeout(timeoutRealisation, 1000);
    } else {
      console.log("BOOM!");
    }
  }
  setTimeout(timeoutRealisation, 1000);
}

// 2
let me = {
  name: "Yehor",
  residency: "Kyiv",
  bornCity: "Sviatohirsk",
  gender: "male",
  age: 18,
  hobby: {
    current: ["football", "volleyball", "table tennis", "other sports"],
    earlier: ["hiking with a metal detector", "fishing"],
  },
  burnout: false,
  getInfo() {
    console.log(
      `My name is ${this.name}, I was born in the city of ${this.bornCity} and recently moved to ${this.residency}`
    );
  },
  getHobbies() {
    console.log(
      `At the moment my hobbies are: ${[...this.hobby.current].join(
        ", "
      )}, and also earlier I was fond of ${[...this.hobby.earlier].join(", ")}`
    );
  },
  getBurnout() {
    console.log(`Burnout mode: ${this.burnout}`);
  },
};

me.getInfo();
me.getHobbies();
me.getBurnout();

// 3
let securedSelfInfo = me.getInfo.bind(me);
let securedSelfHobbies = me.getHobbies.bind(me);
let securedSelfBurnout = me.getBurnout.bind(me);

setTimeout(securedSelfInfo, 1000);
setTimeout(securedSelfHobbies, 2000);
setTimeout(securedSelfBurnout, 3000);

// 4
function someFunction(a, b) {
  console.log(a * b);
}

function slower(func, seconds) {
  return (...args) => {
    console.log(`Chill out, you will get you result in ${seconds} seconds`);

    setTimeout(() => func(...args), seconds * 1000);
  };
}

let slowedSomeFunction = slower(someFunction, 5);

slowedSomeFunction(2, 5);
