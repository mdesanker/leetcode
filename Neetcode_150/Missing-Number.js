/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // initialize res to length of nums because will iterate though nums.length - 1
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) {
    res += i - nums[i];
  }
  return res;
};

// Time: O(n)
// Space: O(1)

// // Bit Manipulation
// var missingNumber = function(nums) {
//     // Initialize res as zero...
//     let res = 0;
//     // Traverse all the element through the loop...
//     for (let i = 0; i < nums.length; ++i) {
//         // Calculation process by helping of Bit Manipulation...
//         res ^= nums[i] ^ (i + 1);
//     }
//     return res;     // Return the result
// };
