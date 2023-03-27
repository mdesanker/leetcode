var longestBitonicSequence = function (n, arr) {
  const dp1 = new Array(n).fill(1);
  const dp2 = new Array(n).fill(1);

  // LIS in forward direction
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp1[i] = Math.max(dp1[i], 1 + dp1[j]);
      }
    }
  }

  // LIS in reverse direction
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (arr[i] > arr[j]) {
        dp2[i] = Math.max(dp2[i], 1 + dp2[j]);
      }
    }
  }

  // find maximum bitonic combination
  let max = -1;
  for (let i = 0; i < n; i++) {
    // subtract 1 because element i is double counted
    max = Math.max(max, dp[i] + dp[j] - 1);
  }
  return max;
};

// Time: O(n^2)
// Space: O(n)
