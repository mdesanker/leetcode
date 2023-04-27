/**
 * @param {number} n
 * @return {number}
 */
// Brute force
var bulbSwitch = function (n) {
  if (n === 0) return 0;

  const arr = new Array(n).fill(1);

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      if ((j + 1) % i === 0) arr[j] = 1 - arr[j];
    }
  }
  return arr.reduce((a, b) => a + b);
};
// TC: O(n^2)
// SC: O(n)

var bulbSwitch = function (n) {
  return Math.floor(Math.sqrt(n));
};
// TC: O(1)
// SC: O(1)
