console.log("=== Part 3: Deferred Execution ===");


const outputElement = document.getElementById('primes-output');
const countElement = document.getElementById('count');
const timeElement = document.getElementById('time');
const limitInput = document.getElementById('limit-input');


function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}


function calculatePrimesSync(limit) {
  const startTime = Date.now();
  outputElement.innerHTML = '';
  let count = 0;
  
  for (let i = 1; i <= limit; i++) {
    if (isPrime(i)) {
      outputElement.innerHTML += `<span class="prime">${i}</span>`;
      count++;
    }
  }
  
  const elapsed = Date.now() - startTime;
  countElement.textContent = count;
  timeElement.textContent = elapsed;
  
  alert(`Calculation complete! Found ${count} primes in ${elapsed}ms`);
}


function calculatePrimesAsync(limit) {
  const startTime = Date.now();
  outputElement.innerHTML = '';
  let count = 0;
  let current = 1;
  
  function processNext() {
    
    const batchSize = 100; 
    const end = Math.min(current + batchSize, limit + 1);
    
    for (; current < end; current++) {
      if (isPrime(current)) {
        outputElement.innerHTML += `<span class="prime">${current}</span>`;
        count++;
      }
    }
    
   
    countElement.textContent = count;
    timeElement.textContent = Date.now() - startTime;
    
  
    if (current > limit) {
      const elapsed = Date.now() - startTime;
      alert(`Calculation complete! Found ${count} primes in ${elapsed}ms`);
      return;
    }
    
  
    setTimeout(processNext, 0);
  }
  
 
  processNext();
}

function calculatePrimesAsyncRecursive(limit) {
  const startTime = Date.now();
  outputElement.innerHTML = '';
  let count = 0;
  
  function checkNumber(num) {
    if (num > limit) {
     
      const elapsed = Date.now() - startTime;
      countElement.textContent = count;
      timeElement.textContent = elapsed;
      alert(`Calculation complete! Found ${count} primes in ${elapsed}ms`);
      return;
    }
    
    if (isPrime(num)) {
      outputElement.innerHTML += `<span class="prime">${num}</span>`;
      count++;
    }
    
  
    countElement.textContent = count;
    timeElement.textContent = Date.now() - startTime;
    
  
    setTimeout(() => checkNumber(num + 1), 0);
  }
  

  checkNumber(1);
}


document.getElementById('calculate-sync').addEventListener('click', () => {
  const limit = parseInt(limitInput.value) || 10000;
  console.log(`Calculating primes up to ${limit} (synchronous)...`);
  calculatePrimesSync(limit);
});

document.getElementById('calculate-async').addEventListener('click', () => {
  const limit = parseInt(limitInput.value) || 10000;
  console.log(`Calculating primes up to ${limit} (asynchronous)...`);
  calculatePrimesAsync(limit);
});


function benchmark() {
  console.log("\n=== Benchmark Results ===");
  
  const testLimit = 5000;
  const iterations = 10;
  
 
  let syncTotal = 0;
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    let count = 0;
    for (let j = 1; j <= testLimit; j++) {
      if (isPrime(j)) count++;
    }
    const end = performance.now();
    syncTotal += (end - start);
  }
  
  console.log(`Synchronous average: ${(syncTotal / iterations).toFixed(2)}ms`);
  console.log(`Synchronous is faster but blocks the UI`);
  console.log(`Asynchronous is slower but keeps UI responsive`);
}


window.addEventListener('load', benchmark);