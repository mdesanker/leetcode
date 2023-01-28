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
Time: O(n)
Space: O(1)
*/

/**
Use sliding window approach, moving r pointer from beginning to end of prices.
If r reaches a value that is less than l, update l to r, because we want this new
minimum to be the new buy price.
While iterating and making this check, check whether the current profit is larger than
current max.

TC: O(n) iterate through prices array once
SC: O(1) constant memory to store l and r pointers
 */

// While loop implementation
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit2 = function (prices) {
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
