/**
 * @param {number[]} prices
 * @return {number}
 */

const maxProfit = function (prices) {
  let l = 0,
    max = 0;

  for (let r = 1; r < prices.length; r++) {
    // if sell value is lower, set that to buy value
    if (prices[r] < prices[l]) {
      l = r;
    }
    const profit = prices[r] - prices[l];
    max = Math.max(max, profit);
  }
  return max;
};

/*
Time: O(N)
Space: O(N)
*/
