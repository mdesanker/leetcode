/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const res = [-1, -1];

  // find first occurence of target
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (target <= nums[mid]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  // if target is not in nums array
  if (nums[l] !== target) return res;
  // set res[0] to index of first occurence
  else res[0] = l;

  // find last occurence or position just after last occurence
  r = nums.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (target < nums[mid]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  // set res[1]
  res[1] = nums[l] === target ? l : l - 1;
  return res;
};

// Time: O(nlogn)
// Space: O(1)
