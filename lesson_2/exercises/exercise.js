// ============================================================
// 308A.2 — Exercises: Classes & OOP
// ============================================================
// These exercises build progressively toward the skills needed
// for GLAB 308A.2.1 and the SBA capstone.
//
// Instructions:
//   - Complete each TODO section.
//   - Run this file with Node.js:  node exercise.js
// ============================================================


// ------------------------------------------------------------
// Exercise 1: Object Literals Review
// ------------------------------------------------------------
// Goal: Refresh object syntax before introducing classes.

const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 180,
  isRead: false,
  markAsRead() {
    this.isRead = true;
    console.log(`${this.title} has been marked as read.`);
  },
  summary(){
    return `${this.title} by ${this.author}, ${this.pages} pages`; 
  },
};


// TODO 1: Log the book's title and author.
console.log(book.title); 
console.log(book.author); 

// TODO 2: Call markAsRead() and verify isRead is now true.
book.markAsRead(); 
console.log(book.isRead); 

// TODO 3: Add a summary() method that returns
//         "The Great Gatsby by F. Scott Fitzgerald, 180 pages"
console.log(book.summary()); 


// ------------------------------------------------------------
// Exercise 2: The `this` Keyword
// ------------------------------------------------------------
// Goal: Understand how `this` references the owning object.

const dog = {
  name: "Buddy",
  breed: "Golden Retriever",
  tricks: ["sit", "shake", "roll over"],
  showTricks() {
    console.log(`${this.name} can do: ${this.tricks.join(", ")}`);
  },
};

// TODO 1: Call dog.showTricks().
dog.showTricks(); 

// TODO 2: Create a standalone function greet() that uses this.name.
function greet(){
  console.log(`Hi, my name is ${this.name}`); 
}

// TODO 3: Assign greet to dog.greet and call it — does it work?
dog.greet = greet; 
dog.greet(); 

// TODO 4: Call greet() alone — what happens and why?
//         Write your answer as a comment.


// ------------------------------------------------------------
// Exercise 3: Your First Class
// ------------------------------------------------------------
// Goal: Define and instantiate a basic class.

class Pet {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.isHungry = true;
  }

  feed() {
    this.isHungry = false;
    console.log(`${this.name} has been fed!`);
  }

  describe(){
    console.log(`${this.name} is a ${this.species}`); 
  }
}

// TODO 1: Create 3 different pets using the Pet class.
const pet1 = new Pet("Molly", "Dog"); 
const pet2 = new Pet("Howie", "Cat"); 
const pet3 = new Pet("Dizzy", "Demon"); 

// TODO 2: Feed one of them and verify isHungry changed.
pet1.feed(); 
console.log(pet1.isHungry); 
console.log(pet3.isHungry); 

// TODO 3: Add a describe() method to Pet that logs
//         "Buddy is a Dog" (using the instance's name and species).
pet2.describe(); 
pet3.describe(); 

// ------------------------------------------------------------
// Exercise 4: Constructor Practice
// ------------------------------------------------------------
// Goal: Practice passing different arguments to constructors.

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }

  isSquare() {
    return this.width === this.height;
  }
  describe(){
    return `Rectangle: ${this.width}x${this.height}, Area: 
    ${this.area()}`; 
  }
}

// TODO 1: Create a 5×10 rectangle and log its area and perimeter.
const rect1 = new Rectangle(5, 10); 
console.log(rect1.area()); 
console.log(rect1.perimeter()); 

// TODO 2: Create a 7×7 rectangle and verify isSquare() returns true.
const rect2 = new Rectangle(7, 7); 
console.log(rect2.isSquare()); 

// TODO 3: Add a describe() method that returns
//         "Rectangle: 5×10, Area: 50"
console.log(rect1.describe)

// ------------------------------------------------------------
// Exercise 5: Inheritance Basics
// ------------------------------------------------------------
// Goal: Use extends and super for the first time.

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    console.log(`${this.make} ${this.model} started!`);
  }

  stop() {
    this.isRunning = false;
    console.log(`${this.make} ${this.model} stopped.`);
  }
}

// TODO 1: Create a Car class that extends Vehicle and adds numDoors.
class Car extends Vehicle{
  constructor(make, model, year, numDoors){
    super(make, model, year); 
   this.numDoors = numDoors;  
  }
  honk(){
    console.log("Beep Beep!"); 
  }
}
// TODO 2: Create a Motorcycle class that extends Vehicle and adds hasSidecar.
class Motorcycle extends Vehicle {
  constructor(make, model, year, hasSidecar= false){
    super(make, model, year); 
    this.hasSidecar = hasSidecar; 
  }
}
// TODO 3: Instantiate one of each and test all methods.
const myCar = new Car("Ford", "Fusion", 2020, 4); 
myCar.start(); 
myCar.honk(); 
myCar.stop(); 
// TODO 4: Add a honk() method to Car that logs "Beep beep!".
const myBike = new Motorcycle("Moto Guzzi", "El Dorado", 1974)
myBike.start(); 
myBike.stop(); 
// ------------------------------------------------------------
// Exercise 6: Method Overriding
// ------------------------------------------------------------
// Goal: Override parent methods in child classes.
class MotorcycleV2 extends Vehicle{
  constructor(make, model, year, hasSidecar = false){
    super(make, model, year); 
    this.hasSidecar = hasSidecar; 
  }
  start(){ 
    super.start(); 
    console.log ("Vroom vroom!")
  }
}
const bike2 = new MotorcycleV2("Indian", "Chief Vintage", 2026); 
bike2.start(); 
console.log(bike2.isRunning); 
// TODO: Using your Vehicle classes from Exercise 5:
// 1. Override start() in Motorcycle to log "Vroom vroom!" instead.
// 2. Use super.start() inside the override so isRunning still
//    gets set to true.
// 3. Verify that Car.start() still behaves normally.
const car2 = new Car("Ford", "Edge", 2016, 4); 
car2.start(); 

// ------------------------------------------------------------
// Exercise 7: Private Fields & Getters/Setters
// ------------------------------------------------------------
// Goal: Practice encapsulation with # fields.

class BankAccount {
  // TODO: Add private fields #balance and #owner
#balance = 0; 
#owner; 
  constructor(owner, initialDeposit = 0) {
    // TODO: Set #owner and #balance
    this.#owner= owner; 
    this.#balance = initialDeposit; 
  }

  // TODO: Add a getter for balance that returns "$X.XX" format
get balance(){
  return `$${this.balance.toFixed(2)}`; 
}
  // TODO: Add a getter for owner
  get owner (){
    return this.#owner
  }

  deposit(amount) {
    // TODO: If amount > 0, add to #balance and log the new balance
   if (amount >0){
    this.#balance += amount; 
    console.log(`Deposited $${amount}. New Balance: ${this.balance}`); 
   }
  }

  withdraw(amount) {
    // TODO: If amount > 0 AND amount <= #balance, subtract and log
    //       Otherwise, log "Insufficient funds!"
  if(amount > 0 && amount <= this.balance){
    this.#balance -= amount; 
    console.log (`Withdrew $${amount}. New balnce ${this.balance}`); 
  } else{
    console.log("Insufficient funds!")
  }
  }
}

// TODO 1: Create an account with $100 initial deposit.
const account = new BankAccount('Bob', 100); 
console.log(account.balance); 
// TODO 2: Deposit $50 and withdraw $30.
account.deposit(50); 
account.withdraw(30); 
// TODO 3: Try to access #balance directly — what happens?

// TODO 4: Try to withdraw more than the balance — what happens?
account.withdraw(1000); 

// ------------------------------------------------------------
// Exercise 8: Static Methods
// ------------------------------------------------------------
// Goal: Create and use static class members.

class MathHelper {
  // TODO: Add a static method celsiusToFahrenheit(c)
  //       Formula: (c * 9/5) + 32
static celsiusToFahrenheit(c){
  return(c * 9/5) + 32; 
}

  // TODO: Add a static method fahrenheitToCelsius(f)
  //       Formula: (f - 32) * 5/9
static fahrenheitToCelsius(f){
  return (f-32)* 5 /9; 
}
  // TODO: Add a static method randomBetween(min, max)
  //       Returns a random integer between min and max (inclusive)
static randomBetween(min, max){
  return Math.floor(Math.random()*(max - min + 1))+ min; 
}

static isPrime(n){
  if (n<2) return false; 
  for (let i =2; i< Marth.sqrt(n); i++){
    if (n % i ===0) return false; 
  }
  return true; 
}
}

// TODO 1: Convert 100°C to Fahrenheit (no `new`!).
console.log(MathHelper.celsiusToFahrenheit(100)); 
// TODO 2: Generate 5 random numbers between 1 and 100.
for (let i = 0; i < 5; i++){
  console.log(MathHelper.randomBetween(1,100))
}
// TODO 3: Add a static method isPrime(n) that returns true/false.
console.log(MathHelper.isPrime(1)); 
console.log(MathHelper.isPrime(2)); 

// ------------------------------------------------------------
// Exercise 9: Factory Functions
// ------------------------------------------------------------
// Goal: Create objects with factory functions instead of classes.

function createPlayer(name, level = 1) {
  let health = level * 100;
  let xp = 0;

  return {
    name,
    level,
   
   
   

    // TODO: Add getHealth() that returns health
 getHealth(){return health; }, 
    // TODO: Add getXP() that returns xp
 getXP(){ return xp; },
    // TODO: Add gainXP(amount) that adds to xp and logs it
 gainXP(amount){
      xp += amount; 
      console.log(`${name} gained ${amount} XP! Total: ${xp}`);
    }, 
    // TODO: Add takeDamage(amount) that subtracts from health and logs it
     takeDamage(amount){
      health -= amount; 
      console.log(`${name} took ${amount} damage! Health: ${health}`); 
    },

  };
}

// TODO 1: Create two players.
const player1= createPlayer("Ryotoro", 2); 
const player2= createPlayer("Momotaros"); 
// TODO 2: Have one take damage and the other gain XP.
player1.takeDamage(30);
player2.gainXP(50); 
// TODO 3: Try to directly set health — can you? Why or why not?
//         Write your answer as a comment.

// TODO 4: How is this different from a class with private fields?
//         Write your answer as a comment.


// ------------------------------------------------------------
// Exercise 10: Prototype Exploration
// ------------------------------------------------------------
// Goal: Understand the prototype chain.

class Shape {}
class Circle extends Shape {}

const c = new Circle();

// TODO 1: Log Object.getPrototypeOf(c) — what do you see?
console.log(Object.getPrototypeOf(circ)); 
// TODO 2: Log the results of these three checks:
console.log(circ instanceof Circle); //   c instanceof Circle
console.log(circ instanceof Shape); //   c instanceof Shape
console.log(circ instanceof Object);//   c instanceof Object

// TODO 3: Add a method to Shape.prototype after creating c.
//         Can c access it? Why does this work?
//         Write your answer as a comment.
Shape.prototype.describe= function(){
  return `I am a ${this.constructor.name}`; 
}
console.log(circ.describe()); 
// ------------------------------------------------------------
// Exercise 11: Putting It All Together — Mini RPG
// ------------------------------------------------------------
// Goal: Combine all concepts. Prepares for GLAB 308A.2.1.

// TODO 1: Create a Character class with:
//   - name, health (100, private), attack, defense
//   - takeDamage(amount) method (reduce health, factor in defense)
//   - static MAX_HEALTH = 100
class Character {
  static MAX_HEALTH = 100; 
  #health; 

  constructor(name, attack, defense){
    this.name = name; 
    this.attack = attack; 
    this.defense = defense; 
    this. #health = Character.MAX_HEALTH; 
  }
  get health(){
    return this.#health; 
  }
  takeDamage(amount){
    const actualDamage = Math.max(0, amount - this.defense); 
    this.#health = Math.max(0, this.#health - actualDamage); 
    console.log(
      `${this.name} takes ${actualDamage} damage! (${amount}- ${this.defense} defense) HP: ${this.#health}`
    ); 
  }
  isAlive(){
    return this.#health > 0; 
  }
}
// TODO 2: Create a Warrior class (extends Character):
//   - Extra property: armor
//   - Method: slash() — returns attack damage
class Warrior extends Character {
  constructor(name, attack, defense, armor){
    super(name, attack, defense + armor); 
    this.armor = armor; 
  }
  slash(){
    const damage = this.attack + Math.floor(Math.random ()* 5); 
    console.log(`${this.name} slashes for ${damage} damage`); 
    return damage; 
  }
}
// TODO 3: Create a Mage class (extends Character):
//   - Extra property: mana
//   - Method: castSpell() — returns magic damage, costs mana
class Mage extends Character { 
  constructor(name, attack, defense, mana){
    super(name, attack, defense); 
    this.mana= mana; 
  }
  castSpell(){
    if(this.mana >=10){
      this.mana -= 10; 
      const damage = this.attack * 2 + Math.floor(Math.random()* 8 ); 
      console.log(`${this.name} cast a spell for ${damage} damage! (Mana: ${this.mana})`); 
      return damage; 
    }else {
      console.log (`${this.name} is out of mana! Basic attack for  ${this.attack} damage.`); 

    }
  }
}
// TODO 4: Create a battle(char1, char2) function:
//   - Characters take turns attacking until one reaches 0 health
//   - Log each attack and remaining health
//   - Declare the winner
function battle(char1, char2){
  console.log(`\n BATTLE: ${char1.name} vs ${char2.name}\n`);
  let turn = 1; 

  while (char1.isAlive() && char2.isAlive()){ 
    console.log (`--- Turn ${turn}---`); 

  let damage; 
  if (char1 instanceof Warrior) damage = char1.slash(); 
  else if (char1 instanceof Mage)damage = char1.castSpell(); 
  else damage = char1.attack; 
  char2.takeDamage(damage); 

  if(!char2.isAlive()){
    console.log(`\n ${char1.name} wins!\n`); 
    return char1; 
  }
      if (char2 instanceof Warrior) damage = char2.slash();
    else if (char2 instanceof Mage) damage = char2.castSpell();
    else damage = char2.attack;
    char1.takeDamage(damage);

    if (!char1.isAlive()) {
      console.log(`\n🏆 ${char2.name} wins!\n`);
      return char2;
    }

    turn++;                         
  
  }
  
}

const warrior = new Warrior("Uratoros", 10, 5, 3);
const mage = new Mage("Ryutoros", 13, 2, 30); 
battle(warrior, mage); 

// ============================================================
// 🎯 Checkpoint: Ready for the Assignment?
// ============================================================
// Before starting GLAB 308A.2.1, make sure you can:
//   [ ] Define a class with a constructor
//   [ ] Instantiate objects with new
//   [ ] Use extends and super for inheritance
//   [ ] Create private fields with #
//   [ ] Write getters and setters
//   [ ] Create static methods
//   [ ] Explain inheritance, encapsulation, abstraction, polymorphism
