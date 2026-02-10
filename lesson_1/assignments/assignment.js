

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






console.log("\n=== Part 2: Trampolines ===");


function trampoline(fn) {
  let result = fn();
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}


function flattenArrayRecursive(arr, result = []) {
  for (let item of arr) {
    if (Array.isArray(item)) {
    
      flattenArrayRecursive(item, result);
    } else {
      result.push(item);
    }
  }
  return result;
}


function flattenArrayTrampolined(arr) {
  function flattenHelper(remainingArrays, result = [], index = 0) {
  
    if (remainingArrays.length === 0) {
      return result;
    }
    
 
    const currentArray = remainingArrays[0];
    const remaining = remainingArrays.slice(1);
    
    function processArray(arrToProcess, res = [], idx = 0) {
      if (idx >= arrToProcess.length) {
        
        return () => flattenHelper(remaining, res);
      }
      
      const element = arrToProcess[idx];
      if (Array.isArray(element)) {
       
        const newRemaining = [element, ...remaining];
        return () => flattenHelper(newRemaining, res);
      } else {
       
        res.push(element);
        return () => processArray(arrToProcess, res, idx + 1);
      }
    }
    
    return () => processArray(currentArray, result);
  }
  
  return trampoline(() => flattenHelper([arr]));
}


function trampolineFlatten(arr) {
  function flattenStep(arrays, flat = []) {
    if (arrays.length === 0) {
      return flat;
    }
    
    const [first, ...rest] = arrays;
    
    if (Array.isArray(first)) {
     
      return () => flattenStep([...first, ...rest], flat);
    } else {
      
      flat.push(first);
      return () => flattenStep(rest, flat);
    }
  }
  
  return trampoline(() => flattenStep(arr));
}


const deeplyNestedArray = [1, [2, [3, [4, [5, [6]]]]], 7, [8, [9]]];
const veryDeepArray = Array(1000).fill(0).map((_, i) => 
  i % 10 === 0 ? Array(10).fill(i) : i
);

console.log("Original array:", deeplyNestedArray);
console.log("Flattened (trampolined):", trampolineFlatten(deeplyNestedArray));


try {
  const recursiveResult = flattenArrayRecursive(deeplyNestedArray);
  console.log("Flattened (recursive):", recursiveResult);
} catch (error) {
  console.log("Recursive version crashed:", error.message);
}


try {
  console.log("\nTesting with very deep array (1000 elements)...");
  const trampolineResult = trampolineFlatten(veryDeepArray);
  console.log(`Trampoline succeeded! Flattened ${trampolineResult.length} elements`);
} catch (error) {
  console.log("Trampoline failed:", error.message);
}

const massiveArray = Array(20000).fill(1);
console.log("\nTesting stack overflow scenario...");
try {
  const result = flattenArrayRecursive(massiveArray);
  console.log("Direct recursion succeeded");
} catch (error) {
  console.log("Direct recursion failed with stack overflow");
}

try {
  const result = trampolineFlatten(massiveArray);
  console.log("Trampoline succeeded with massive array!");
} catch (error) {
  console.log("Trampoline failed:", error.message);
}