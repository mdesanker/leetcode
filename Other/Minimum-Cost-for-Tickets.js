/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
// Recursion [TLE]
var mincostTickets = function (days, costs) {
  const lastDay = days[days.length - 1];
  const daysSet = new Set(days);

  function dp(i) {
    if (i > lastDay) return 0;

    if (daysSet.has(i)) {
      let one = costs[0] + dp(i + 1);
      let seven = costs[1] + dp(i + 7);
      let thirty = costs[2] + dp(i + 30);
      return Math.min(one, seven, thirty);
    } else {
      return dp(i + 1);
    }
  }
  return dp(1);
};
// Time: O(3^m) where m is last day of travel
// Space: O(m)

// Recursion + Memoization
var mincostTickets = function (days, costs) {
  const daysSet = new Set(days);
  const lastDay = days[days.length - 1];
  const memo = new Array(lastDay + 1).fill(-1);

  function dp(i) {
    if (i > lastDay) return 0;

    if (memo[i] !== -1) return memo[i];

    if (daysSet.has(i)) {
      let one = costs[0] + dp(i + 1);
      let seven = costs[1] + dp(i + 7);
      let thirty = costs[2] + dp(i + 30);
      return (memo[i] = Math.min(one, seven, thirty));
    } else {
      return (memo[i] = dp(i + 1));
    }
  }
  return dp(1);
};
// Time: O(m) where m is last day of travel
// Space: O(m)

// Tabulation
var mincostTickets = function (days, costs) {
  const daysSet = new Set(days);
  const lastDay = days[days.length - 1];
  const dp = new Array(lastDay + 1).fill(0);

  for (let i = 1; i < lastDay + 1; i++) {
    if (daysSet.has(i)) {
      let [one, seven, thirty] = costs;
      if (i > 0) one = costs[0] + dp[i - 1];
      if (i > 7) seven = costs[1] + dp[i - 7];
      if (i > 30) thirty = costs[2] + dp[i - 30];
      dp[i] = Math.min(one, seven, thirty);
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[lastDay];
};
// Time: O(m) where m = last day of travel
// Space: O(m)
