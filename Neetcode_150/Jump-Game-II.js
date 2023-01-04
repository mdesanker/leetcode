/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let res = 0;
  let l = 0,
    r = 0;

  // interate until r is at end of array
  while (r < nums.length - 1) {
    let farthest = 0;
    for (let i = l; i < r + 1; i++) {
      // farthest location can jump is current index by current value
      farthest = Math.max(farthest, i + nums[i]);
    }
    l = r + 1;
    r = farthest;
    // increment res counter
    res++;
  }
  return res;
};

// Time: O(n)
// Space: O(1)
