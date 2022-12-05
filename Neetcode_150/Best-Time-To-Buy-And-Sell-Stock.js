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

// While loop implementation
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let left = 0,
    right = 1,
    max = 0;

  while (right < prices.length) {
    // if sell value is lower, set that to buy value
    if (prices[right] < prices[left]) {
      left = right;
    }

    const profit = prices[right] - prices[left];
    max = Math.max(max, profit);

    right++;
  }
  return max;
};
