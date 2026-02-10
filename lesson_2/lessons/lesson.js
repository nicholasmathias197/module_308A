class Animal {
  constructor(eyes, legs, isAwake, isMoving) {
    this.eyes = eyes;
    this.legs = legs;
    this.isAwake = isAwake;
    this.isMoving = isMoving;
  }
  sleep() { this.isAwake = false; }
  wake() { this.isAwake = true; }
  sit() { this.isMoving = false; }
  walk() { this.isMoving = true; }
  speak(sound) { console.log(sound); }
  toString(animal = 'Animal') {
    return `This ${animal} has ${this.eyes} eyes and ${this.legs} legs. It ${this.isAwake ? 'is' : 'is not'} awake, and ${this.isMoving ? 'is' : 'is not'} moving.`;
  }
}

class Human extends Animal {
  constructor(name, skin, isAwake, isMoving) {
    super(2, 2, isAwake, isMoving);
    this.name = name;
    this.skin = skin;
  }
  
  speak() { 
    super.speak(`Hello, I'm ${this.name}!`); 
  }
  
  introduce() {
    console.log(`Hi! My name is ${this.name}.`);
    this.speak();
    console.log(`I have ${this.skin} skin.`);
  }
  
  toString() {  
    return super.toString("Human"); 
  }
}


const person = new Human("Alex", "olive", true, false);
person.introduce();
console.log(person.toString());


class Developer extends Human {
  constructor(name, skin, isAwake, isMoving, language) {
    super(name, skin, isAwake, isMoving);
    this.language = language;
  }
  
  introduce() {
    super.introduce(); 
    console.log(`I'm a developer who loves ${this.language}!`);
  }
  
  code() {
    console.log(`${this.name} is coding in ${this.language}...`);
  }
}

class FrontEndDeveloper extends Developer {
  constructor(name, skin, isAwake, isMoving, language, framework) {
    super(name, skin, isAwake, isMoving, language);
    this.framework = framework;
  }
  
  introduce() {
    super.introduce();
    console.log(`My favorite framework is ${this.framework}.`);
  }
  
  designUI() {
    console.log(`${this.name} is designing a UI with ${this.framework}`);
  }
}

console.log("\n--- Testing Developer ---");
const dev = new Developer("Sam", "fair", true, true, "JavaScript");
dev.introduce();
dev.code();

console.log("\n--- Testing FrontEndDeveloper ---");
const frontendDev = new FrontEndDeveloper("Taylor", "tan", true, true, "JavaScript", "React");
frontendDev.introduce();
frontendDev.code();
frontendDev.designUI();