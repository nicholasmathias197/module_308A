

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

console.log("Trampoline countdown from 50:");
trampoline(() => countdown(50));





// function trampoline(fn) {
//   let result = fn();
//   while (typeof result === 'function') {
//     result = result();
//   }
//   return result;
// }
// function flattenArray(arr, acc = []) {
//     for (let i = 0; i < arr.length; i++) {
//         if (Array.isArray(arr[i])) {
//             flattenArray(arr[i], acc);
//         } else {
//             acc.push(arr[i]);
//         }
//     }
//     return acc;
// }
// const nestedArray = [1, [2, [3, [4, [5]]]]];
// const result = trampoline(() => flattenArray(nestedArray));
// console.log("--- Part 2: Flattened Array ---");
// console.log(result);

function trampoline(fn) {
  while (fn && typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function flattenArrayTrampoline(arr) {
  return trampoline(() => {
    const stack = [arr];  // Use explicit stack instead of recursion
    const result = [];
    
    return function flattenStep() {
      if (stack.length === 0) {
        return result;  // Base case: return the result
      }
      
      const current = stack.pop();
      
      for (let i = current.length - 1; i >= 0; i--) {
        if (Array.isArray(current[i])) {
          stack.push(current[i]);
        } else {
          result.push(current[i]);
        }
      }
      
      return () => flattenStep();  // Return next step as a function
    }();
  });
}

// Test it
const nestedArray = [1, [2, [3, [4, [5]]]]];
console.log("=== Testing flattenArrayTrampoline ===");

const result = flattenArrayTrampoline(nestedArray);
console.log("Flattened array:", result);
console.log("Expected: [1, 2, 3, 4, 5]");