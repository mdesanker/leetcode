/**
Solution - Two Pointer

In sliding window portion, if sum is less than target, then every set of values less than r will also be valid
Therefore we add r - l to count
 */
var threeSumSmaller = function (nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < n; i++) {
    let l = i + 1,
      r = n - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < target) {
        count += r - l;
        l++;
      } else {
        r--;
      }
    }
  }
  return count;
};
// TC: O(nlogn + n^2) = O(n^2) built in sort + nested loops
// SC: O(logn) built in sort
