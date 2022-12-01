/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function (nums) {
  const res = [];

  // sort array to use two pointer pattern
  nums.sort((a, b) => a - b);

  // iterate through array
  for (let i = 0; i < nums.length; i++) {
    // if current num is same as previous num, skip to prevent duplicate
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // instantiate two pointers
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        res.push([nums[i], nums[left], nums[right]]);

        left++;
        right--;

        // skip repeats
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return res;
};

/*
Time: O(N^2)
Space: O(1)
*/
