// Tabulation - get LIS
var lengthOfLIS = function (nums) {
  const n = nums.length;

  let dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
  }
  return Math.max(...dp);
};
// Time: O(n^2)
// Space: O(n)

// Print LIS
var printLIS = function (nums) {
  const n = nums.length;

  let dp = new Array(n).fill(1);
  // hash array stores index of previous element
  const hash = [];
  for (let i = 0; i < n; i++) hash.push(i);

  let max = 1,
    lastInd = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && 1 + dp[j] > dp[i]) {
        dp[i] = 1 + dp[j];
        // update prev in hash array if valid
        hash[i] = j;
      }
    }
    // track max length and last index of max length
    if (dp[i] > max) {
      max = dp[i];
      lastInd = i;
    }
  }

  const res = [];
  res.push(nums[lastInd]);
  while (hash[lastInd] !== lastInd) {
    lastInd = hash[lastInd];
    res.push(nums[lastInd]);
  }
  return res.reverse();
};
// Time: O(n^2)
// Space: O(n)

console.log(printLIS([5, 4, 11, 1, 16, 8]));
