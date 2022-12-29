/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // if no nums array
  if (nums.length === 0) return 0;
  // if only one element in nums
  if (nums.length === 1) return nums[0];

  // call house robber on nums omitting first and last values since they can't be robbed together
  return Math.max(helper(nums.slice(1)), helper(nums.slice(0, -1)));

  // helper function is House Robber I
  function helper(nums) {
    let rob1 = 0,
      rob2 = 0;
    for (let num of nums) {
      // newRob = current num + second house away(rob2) or adjacent house(rob1)
      let tmp = rob1;
      rob1 = Math.max(num + rob2, rob1);
      rob2 = tmp;
    }
    return rob1;
  }
};

// Time: O(n)
// Space: O(1)
