/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
var countRoutes = function (locations, start, finish, fuel) {
  const MOD = 10 ** 9 + 7;
  const n = locations.length;
  const memo = [...new Array(n)].map(() => new Array(fuel + 1).fill(-1));

  function dp(i, currFuel) {
    // base case
    if (currFuel < 0) return 0;

    // memoization
    if (memo[i][currFuel] !== -1) return memo[i][currFuel];

    // if at finish, count 1 route
    let res = i === finish ? 1 : 0;

    // check all possible routes
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        res =
          (res + dp(j, currFuel - Math.abs(locations[i] - locations[j]))) % MOD;
      }
    }
    return (memo[i][currFuel] = res);
  }
  return dp(start, fuel);
};
// TC: O(n^2 * fuel)
// SC: O(n * fuel)
