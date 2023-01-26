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

/**
Initialize result array. 
For first pass, will iterate through array, pushing the product of all previous nums into each index using a prefix variable that is initialized to 1.
Start by pushing prefix into res, then multiplying prefix by the num at current index, so that it can be added to the next position.

Repeat similar process using a postfix variable initialized to 1 and traveling in reverse direction through array.
Multiply current index in result array by postfix, then multiply postfix by current num in nums array so that it is updated for next position.

TC: O(n) Iterate through nums array in forward direction, O(n), and then in reverse direction, O(n)
SC: O(1) space for the answer is not counted, so no additional space is needed for this solution
 */
