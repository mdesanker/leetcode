/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const n = candies.length,
    max = Math.max(...candies);
  const res = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (candies[i] + extraCandies >= max) res[i] = true;
  }
  return res;
};
// TC: O(n)
// SC: O(n)
