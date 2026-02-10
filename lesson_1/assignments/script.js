
console.log("\n\nDeferred execution simulation:");


console.log("Bad way (blocks):");
for (let i = 1; i <= 3; i++) {
  console.log(`Number ${i}`);
}
console.log("Alert! (you won't see numbers until you click OK)");

console.log("\nGood way (responsive):");
function showNumbers(i) {
  if (i <= 3) {
    console.log(`Number ${i}`);
    setTimeout(() => showNumbers(i + 1), 0);
  } else {
    console.log("Alert! (you see numbers as they appear)");
  }
}
showNumbers(1);

