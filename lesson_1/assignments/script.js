

const output = document.getElementById('primes-output');
const count = document.getElementById('count');
const time = document.getElementById('time');
const input = document.getElementById('limit-input');

function isPrime(num) {
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}


function syncPrimes(n) {
    const start = Date.now();
    output.textContent = '';
    let primeCount = 0;
    
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) {
            output.textContent += i + ' ';
            primeCount++;
        }
    }
    
    count.textContent = primeCount;
    time.textContent = Date.now() - start;
    alert('Done!');
}


function asyncPrimes(n) {
    const start = Date.now();
    output.textContent = '';
    count.textContent = '0';
    
    let i = 2;
    let primeCount = 0;
    
    function checkNext() {
        if (i > n) {
            time.textContent = Date.now() - start;
            alert('Done!');
            return;
        }
        
        if (isPrime(i)) {
            output.textContent += i + ' ';
            primeCount++;
            count.textContent = primeCount;
        }
        
        i++;
        setTimeout(checkNext, 0);
    }
    
    checkNext();
}


document.getElementById('calculate-sync').onclick = function() {
    syncPrimes(parseInt(input.value));
};

document.getElementById('calculate-async').onclick = function() {
    asyncPrimes(parseInt(input.value));
};