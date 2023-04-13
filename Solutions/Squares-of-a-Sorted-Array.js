/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  const res = [];
  for (let num of nums) res.push(num * num);
  return res.sort((a, b) => a - b);
};
// TC: O(nlogn) built-in sort
// SC: O(logn) built-in sort
