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

/**
Sort nums so that duplicates nums can easily be skipped by comparing to the previous num.
We will iterate through every num, then use two pointer approach on remainder of nums array
Since array is sorted, can increment l pointer to increase sum or 
decrement r pointer to decrease sum until sum == 0.

So iterate through nums. If i > 0, then check whether previous num == current num -> continue;

Initialize l pointer to i + 1, and r pointer to end of nums array to use two pointer on 
remainder of nums array. Since array is sorted, move l and r pointers until sum = 0;

If sum = 0, then push array of values to res array.
Increment l and decrement r to see if another combination works.
Once again need to check for duplicates and move pointers as long as still in bounds (l < r)

TC: O(n^2) sort operation is O(nlogn) time complexity. Two pointer approach is O(n) time and this is called n times for every num in array, which makes time complexity O(nlogn + n^2), which is asymptotically equal to O(n^2)
SC: O(1) only memory needed for the three pointers
 */
