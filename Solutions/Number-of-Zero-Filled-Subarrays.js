/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
  let current = 0,
    total = 0;
  for (let num of nums) {
    if (num === 0) {
      current++;
      total += current;
    } else {
      current = 0;
    }
  }
  return total;
};

// Time: O(n)
// Space: O(1)
