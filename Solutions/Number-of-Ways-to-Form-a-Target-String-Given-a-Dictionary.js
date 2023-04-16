// Recursion + Memoization
var numWays = function (words, target) {
  const n = words.length;
  const m = words[0].length;
  const MOD = 10 ** 9 + 7;

  const memo = [...new Array(m)].map(() => new Array(target.length).fill(-1));

  function dp(wIndex, tIndex) {
    if (words[0].length - wIndex < target.length - tIndex) return 0;
    if (tIndex >= target.length) return 1;

    if (memo[wIndex][tIndex] !== -1) return memo[wIndex][tIndex];

    const validStrCount = words.filter((str) => {
      return str[wIndex] === target[tIndex];
    }).length;

    const ways =
      validStrCount * dp(wIndex + 1, tIndex + 1) + dp(wIndex + 1, tIndex);
    return (memo[wIndex][tIndex] = ways % MOD);
  }
  return dp(0, 0);
};
// TC: O(nk + mk)
// SC: O(mk)
