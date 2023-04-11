/**
Solution: Two Pointer
 */
var threeSumClosest = function (nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let res = Infinity,
    minDiff = Infinity;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1,
      r = n - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      const diff = Math.abs(target - sum);
      if (diff < minDiff) {
        minDiff = diff;
        res = sum;
      }

      if (sum > target) r--;
      else l++;
    }
  }
  return res;
};
// TC: O(nlogn + n^2) = O(n^2) - built in sort + nested loops
// SC: O(logn) - built in sort
