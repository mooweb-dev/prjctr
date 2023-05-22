"use strict";

function Animal(name, age, habitat) {
  this.name = name;
  this.age = age;
  this.habitat = habitat;
  this._health = 100;
}

Animal.prototype.getHealth = function () {
  return this._health;
};

Animal.prototype.eat = function () {
  console.log("I will live!");
};

// Bird
const Bird = {
  init(flightHours) {
    this.flightHours = flightHours;
    this._wingsCount = 2;
  },

  getWingsCount() {
    return this._wingsCount;
  },

  fly() {
    console.log(`I can fly because I have ${this.getWingsCount()} wings`);
  },
};

Bird.__proto__ = Animal;

// Reptiles
const Reptiles = {
  init(legsCount) {
    this.legsCount = legsCount;
    this._composure = true;
  },

  getComposure() {
    return this._composure;
  },

  movement() {
    console.log(`I movement on ${this.getComposure()} legs. Go go go!`);
  },
};

Reptiles.__proto__ = Animal;

// Fish
const Fish = {
  init(speed) {
    this.speed = speed;
    this._gill = true;
  },

  getGill() {
    return this._gill;
  },

  swimming() {
    console.log(
      `I can swim underwater because I have ${
        this.getGill() ? "gills" : "..stop. Bad fish out of me"
      }`
    );
  },
};

Fish.__proto__ = Animal;

// Mammals
const Mammals = {
  init(legsCount, speed) {
    this.speed = speed;
    this.legsCount = legsCount;
    this._wool = _wool;
  },

  getWool() {
    return this._wool;
  },

  running() {
    console.log(`I run at an average speed of ${this.speed} km/h`);
  },
};

Mammals.__proto__ = Animal;

// Cat
const Cat = {
  init(nightVision) {
    this.nightVision = nightVision;
    this._sound = "meow";
    this._physicalActivity = "Loves to sleep";
  },

  getPhysicalActivity() {
    return this._physicalActivity;
  },

  greetTheHost() {
    console.log(this._sound);
  },
};

Cat.__proto__ = Mammals;

// Dog
const Dog = {
  init(nightVision) {
    this.nightVision = nightVision;
    this._sound = "woof";
    this._physicalActivity = "Likes to walk";
  },

  getPhysicalActivity() {
    return this._physicalActivity;
  },

  greetTheHost() {
    console.log(this._sound);
  },
};

Dog.__proto__ = Mammals;

console.log(Dog);
