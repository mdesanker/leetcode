/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function (nums, threshold) {
  function isValid(val) {
    let sum = 0;
    for (let num of nums) {
      sum += Math.ceil(num / val);
    }
    return sum <= threshold;
  }

  let l = 1,
    r = Math.max(...nums);
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

// Time: O(nlogk) where n is nums.length, and k = max(nums)
// Space: O(1)
