/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function (nums) {
  const res = [];

  // sort array so can use two-pointer
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // skip if repeat digit
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1,
      right = nums.length - 1;

    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === 0) {
        res.push([nums[i], nums[left], nums[right]]);

        left++;
        right--;

        // skip repeats
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (nums[i] + nums[left] + nums[right] < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
};

/*
Time: O(N^2)
Space: O(1)
*/
