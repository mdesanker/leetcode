/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let max = 0,
    net = 0;
  for (let num of gain) {
    net += num;
    max = Math.max(max, net);
  }
  return max;
};
// TC: O(n)
// SC: O(1)
