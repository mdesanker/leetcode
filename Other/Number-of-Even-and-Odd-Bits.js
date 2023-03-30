/**
 * @param {number} n
 * @return {number[]}
 */
var evenOddBit = function (n) {
  const binary = n.toString(2).split("").reverse();
  let even = 0,
    odd = 0;
  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === "1") {
      if (i % 2 === 0) even++;
      else odd++;
    }
  }
  return [even, odd];
};
// Time: O(n)
// Space: O(n)
