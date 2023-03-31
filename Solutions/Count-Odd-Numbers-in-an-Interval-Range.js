/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  let count = 0;
  for (let i = low; i <= high; i++) {
    if (i % 2 === 1) count++;
  }
  return count;
};

// Time: O(n)
// Space: O(1)
