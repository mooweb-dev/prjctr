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
function Bird(name, age, habitat, flightHours) {
  Animal.call(this, name, age, habitat);
  this.flightHours = flightHours;
  this._wingsCount = 2;
}

Bird.prototype.getWingsCount = function () {
  return this._wingsCount;
};

Bird.prototype.fly = function () {
  console.log(`I can fly because I have ${this.getWingsCount()} wings`);
};

// Reptiles
function Reptiles(name, age, habitat, legsCount) {
  Animal.call(this, name, age, habitat);
  this.legsCount = legsCount;
  this._composure = true;
}

Reptiles.prototype.getComposure = function () {
  return this._composure;
};

Reptiles.prototype.movement = function () {
  console.log(`I movement on ${this.getComposure()} legs. Go go go!`);
};

// Fish
function Fish(name, age, habitat, speed) {
  Animal.call(this, name, age, habitat);
  this.speed = speed;
  this._gill = true;
}

Fish.prototype.getGill = function () {
  return this._gill;
};

Fish.prototype.swimming = function () {
  console.log(
    `I can swim underwater because I have ${
      this.getGill() ? "gills" : "..stop. Bad fish out of me"
    }`
  );
};

// Mammals
function Mammals(name, age, habitat, legsCount, speed) {
  Animal.call(this, name, age, habitat);
  this.speed = speed;
  this.legsCount = legsCount;
  this._wool = true;
}

Mammals.prototype.getWool = function () {
  return this._wool;
};

Mammals.prototype.running = function () {
  console.log(`I run at an average speed of ${this.speed} km/h`);
};

// Cat
function Cat(name, age, habitat, legsCount, speed, nightVision) {
  Mammals.call(this, name, age, habitat, legsCount, speed);
  this.nightVision = nightVision;
  this._sound = "meow";
  this._physicalActivity = "Loves to sleep";
}

Cat.prototype.getPhysicalActivity = function () {
  return this._physicalActivity;
};

Cat.prototype.greetTheHost = function () {
  console.log(this._sound);
};

// Dog
function Dog(name, age, habitat, legsCount, speed, nightVision) {
  Mammals.call(this, name, age, habitat, legsCount, speed);
  this.nightVision = nightVision;
  this._sound = "woof";
  this._physicalActivity = "Likes to walk";
}

Dog.prototype.getPhysicalActivity = function () {
  return this._physicalActivity;
};

Dog.prototype.greetTheHost = function () {
  console.log(this._sound);
};

const dog = new Dog();
