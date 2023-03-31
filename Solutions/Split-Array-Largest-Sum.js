/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/**
Key Insight
We are trying to find the smallest threshold that will allow us to divide the array into k subarrays
Therefore, the min val is the max(nums) and the max val is sum(nums)
Use binary search to find threshold in O(logn) time, then use isValid function to find number of subarrays 
that can be made at that threshold in O(n) time.
Identical to "Capacity to Ship Packages within D Days"
 */

var splitArray = function (nums, k) {
  function isValid(threshold) {
    let count = 1,
      total = 0;
    for (let num of nums) {
      total += num;
      if (total > threshold) {
        total = num;
        count++;
      }
    }
    return count <= k;
  }

  let l = Math.max(...nums),
    r = nums.reduce((a, b) => a + b);
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (isValid(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

// Time: o(nlogn)
// Space: O(1)
