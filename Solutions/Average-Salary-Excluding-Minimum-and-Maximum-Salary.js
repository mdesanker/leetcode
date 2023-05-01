/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
  const n = salary.length;
  let sum = 0;
  let max = -Infinity;
  let min = Infinity;
  for (let val of salary) {
    sum += val;
    max = Math.max(max, val);
    min = Math.min(min, val);
  }
  return (sum - max - min) / (n - 2);
};
// TC: O(n)
// SC: O(1)
