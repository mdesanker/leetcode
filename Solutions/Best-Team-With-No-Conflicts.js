/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function (scores, ages) {
  const pairs = [];
  for (let i = 0; i < scores.length; i++) pairs.push([ages[i], scores[i]]);
  pairs.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  const dp = new Array(pairs.length).fill(0);

  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs.length; j++) {
      if (pairs[j][1] <= pairs[i][1]) dp[i] = Math.max(dp[i], dp[j]);
    }
    dp[i] += pairs[i][1];
  }
  return Math.max(...dp);
};

// Time: O(n^2) because of nested for loops
// Space: O(n) for the dp array
