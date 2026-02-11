class Character {
  static MAX_HEALTH = 100;
  
  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
    console.log(`${this.name} takes ${amount} damage. Health: ${this.health}`);
    return this.health;
  }

  heal(amount) {
    this.health = Math.min(this.health + amount, Character.MAX_HEALTH);
    console.log(`${this.name} heals ${amount} health. Health: ${this.health}`);
    return this.health;
  }

  static describe() {
    console.log(`Characters are the base entities. Max health is ${Character.MAX_HEALTH}.`);
  }
}

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];
  
  constructor(name, role) {
    super(name);
    
    if (!Adventurer.ROLES.includes(role)) {
      console.warn(`Warning: "${role}" is not valid. Using "Adventurer".`);
      this.role = "Adventurer";
    } else {
      this.role = role;
    }
    
    this.inventory.push("bedroll", "50 gold coins");
    this.specialCooldown = 0;
  }

  scout() {
    console.log(`${this.name} the ${this.role} is scouting...`);
    super.roll();
  }

  static listRoles() {
    console.log(`Available roles: ${Adventurer.ROLES.join(", ")}`);
  }

  duel(opponent) {
  console.log(`\ ${this.name} vs ${opponent.name}`);
  let round = 1;
  
  while (this.health > 0 && opponent.health > 0) {
    console.log(`Round ${round}:`);
    const roll1 = this.roll();
    const roll2 = opponent.roll();
    
    const damage = Math.floor(Math.random() * 10) + 5;
    
    if (roll1 > roll2) {
      opponent.takeDamage(damage);
      console.log(`${this.name} hits for ${damage} damage!`);
    } else if (roll2 > roll1) {
      this.takeDamage(damage);
      console.log(`${opponent.name} hits for ${damage} damage!`);
    } else {
      console.log("Clash! No damage.");
    }
    
    console.log(`HP: ${this.name}=${this.health}, ${opponent.name}=${opponent.health}`);
    round++;
    
    if (round > 20) {
      console.log("\nDuel ended - too many rounds!");
      break;
    }
  }
  
  const winner = this.health > opponent.health ? this : opponent;
  console.log(`\n${winner.name} wins in ${round-1} rounds!`);
  return winner;
}
}

class Companion extends Character {
  constructor(name, type, loyalty = 5) {
    super(name);
    this.type = type;
    this.loyalty = loyalty;
    this.isFollowing = true;
  }

  aid(adventurer) {
    if (this.loyalty >= 3) {
      console.log(`${this.name} the ${this.type} aids ${adventurer.name}!`);
      const aidRoll = this.roll();
      
      if (aidRoll >= 15) {
        console.log(`${this.name} provides excellent assistance!`);
        return true;
      } else if (aidRoll >= 8) {
        console.log(`${this.name} provides some help.`);
        return true;
      } else {
        console.log(`${this.name} tries to help but gets distracted.`);
        return false;
      }
    } else {
      console.log(`${this.name} ignores the request for help.`);
      return false;
    }
  }

  follow() {
    this.isFollowing = true;
    console.log(`${this.name} is now following.`);
  }

  wander() {
    this.isFollowing = false;
    console.log(`${this.name} wanders off to explore.`);
  }
}

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

console.log("=== GAME START ===");
console.log(`Character.MAX_HEALTH: ${Character.MAX_HEALTH}`);
console.log(`Adventurer.ROLES: ${Adventurer.ROLES}`);

const healers = new AdventurerFactory("Healer");
const robin = healers.generate("Jin");
const gandalf = healers.generate("Kintaros");

const fighters = new AdventurerFactory("Fighter");
const aragorn = fighters.generate("Hikari");
const conan = fighters.generate("Hidaki");

console.log(`\nCreated ${healers.adventurers.length} healers`);
console.log(`Created ${fighters.adventurers.length} fighters`);

console.log("\n=== DEMONSTRATING DUEL ===");
robin.health = 100;
aragorn.health = 100;
const winner = robin.duel(aragorn);

console.log("\n=== COMPANION DEMO ===");
const leo = new Companion("Blair", "Cat", 8);
const frank = new Companion("Myoga", "Flea", 4);
frank.inventory.push("small hat", "sunglasses");

robin.companion = leo;
leo.companion = frank;

leo.aid(robin);
frank.aid(leo);

console.log("\n=== ADVENTURER ACTIONS ===");
robin.scout();
conan.roll(3);

console.log("\n=== GAME END ===");
console.log("All characters ready for adventure!");



