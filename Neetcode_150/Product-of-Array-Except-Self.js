/**
 * @param {number[]} nums
 * @return {number[]}
 */

const productExceptSelf = function (nums) {
  const res = [];

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    res.push(prefix);
    prefix *= nums[i];
  }

  let postfix = 1;
  for (let j = nums.length - 1; j >= 0; j--) {
    res[j] *= postfix;
    postfix *= nums[j];
  }

  return res;
};

/*
Time: O(N)
Space: O(1) because output array does not count as extra space for space complexity analysis
*/
