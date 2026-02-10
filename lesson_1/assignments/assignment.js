

console.log("=== Part 1: Stack Overflow ===");


let callStackCounter = 0;

function measureStackDepth() {
  callStackCounter++;
  
 
  measureStackDepth();
}


try {
  measureStackDepth();
} catch (error) {
  console.log(`Stack overflow error caught!`);
  console.log(`Error message: ${error.message}`);
  console.log(`Maximum call stack size: ${callStackCounter} calls`);
}


console.log("\n=== Alternative Stack Measurement ===");

let recursiveCounter = 0;

function recursiveFunction() {
  recursiveCounter++;

  const localVar1 = "x".repeat(100); 
  const localVar2 = [1, 2, 3, 4, 5]; 
  const localVar3 = { data: "test" };
  
  return recursiveFunction();
}

try {
  recursiveFunction();
} catch (error) {
  console.log(`Stack overflow with realistic function: ${recursiveCounter} calls`);
  console.log(`Error: ${error}`);
}




function trampoline(fn) {
  while (fn && typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function countdown(n) {
  if (n === 0) return "Done!";
  console.log(n);
  return () => countdown(n - 1);
}

console.log("Trampoline countdown from 5:");
trampoline(() => countdown(5));




