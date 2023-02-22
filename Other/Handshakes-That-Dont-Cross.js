/**
 * @param {number} numPeople
 * @return {number}
 */
var numberOfWays = function (n) {
  let mod = BigInt(1000000007);
  let dp = new Array((n >> 1) + 1).fill(0n); // n >> 1 is just a fancy way of dividing n by 2

  dp[0] = dp[1] = 1n;

  for (let i = 2; i <= n >> 1; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] = (dp[i] + dp[j - 1] * dp[i - j]) % mod;
    }
  }

  return dp[dp.length - 1];
};

// Time: O(n^2)
// Space: O(n)
