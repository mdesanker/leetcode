/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (let num of nums) {
    // xor every number to res and duplicates will be removed
    res = num ^ res;
  }
  return res;
};

// var singleNumber = function(nums) {
//     return nums.reduce((a, b) => a ^ b, 0);
// };

// Time: O(n)
// Space: O(1)
