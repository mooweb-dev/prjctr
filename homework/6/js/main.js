"use strict";

class Animal {
  #health = 100;

  constructor(name, age, habitat) {
    this.name = name;
    this.age = age;
    this.habitat = habitat;
  }

  getHealth() {
    return this.#health;
  }

  eat() {
    console.log("I will live!");
  }
}

class Bird extends Animal {
  #wingsCount = 2;

  constructor(name, age, habitat, flightHours) {
    super(name, age, habitat);
    this.flightHours = flightHours;
  }

  getWingsCount() {
    return this.#wingsCount;
  }

  fly() {
    console.log(`I can fly because I have ${this.getWingsCount()} wings`);
  }
}

class Reptiles extends Animal {
  #composure = true;

  constructor(name, age, habitat, legsCount) {
    super(name, age, habitat);
    this.legsCount = legsCount;
  }

  getComposure() {
    return this.#composure;
  }

  movement() {
    console.log(`I movement on ${this.getComposure()} legs. Go go go!`);
  }
}

class Fish extends Animal {
  #gill = true;

  constructor(name, age, habitat, speed) {
    super(name, age, habitat);
    this.speed = speed;
  }

  getGill() {
    return this.#gill;
  }

  swimming() {
    console.log(
      `I can swim underwater because I have ${
        this.getGill() ? "gills" : "..stop. Bad fish out of me"
      }`
    );
  }
}

class Mammals extends Animal {
  #wool = true;

  constructor(name, age, habitat, speed, legsCount) {
    super(name, age, habitat);
    this.speed = speed;
    this.legsCount = legsCount;
  }

  getWool() {
    return this.#wool;
  }

  running() {
    console.log(`I run at an average speed of ${this.speed} km/h`);
  }
}

class Cat extends Mammals {
  #physicalActivity = "Loves to sleep";

  constructor(name, age, habitat, speed, legsCount, nightVision) {
    super(name, age, habitat, speed, legsCount);
    this.nightVision = nightVision;
    this._sound = "meow";
  }

  getPhysicalActivity() {
    return this.#physicalActivity;
  }

  greetTheHost() {
    console.log(this._sound);
  }
}

class Dog extends Mammals {
  #physicalActivity = "Likes to walk";

  constructor(name, age, habitat, speed, legsCount, nightVision) {
    super(name, age, habitat, speed, legsCount);
    this.nightVision = nightVision;
    this._sound = "woof";
  }

  getPhysicalActivity() {
    return this.#physicalActivity;
  }

  greetTheHost() {
    console.log(this._sound);
  }
}
