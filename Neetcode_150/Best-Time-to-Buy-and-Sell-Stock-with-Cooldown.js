// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solutions/740050/easy-100-speed-o-1-space-python-c-java-javascript/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // initialization
  // sell and hold -Infinity because cannot start from these positions
  let [cooldown, sell, hold] = [0, -Infinity, -Infinity];

  for (let price of prices) {
    let [prevCooldown, prevSell, prevHold] = [cooldown, sell, hold];

    // max profit of cooldown on day i comes from cooldown of day i - 1 or sell of day i - 1
    cooldown = Math.max(prevCooldown, prevSell);

    // max profit of sell on day i comes from hold of day i - 1 and sell on day i
    sell = prevHold + price;

    // max profit of hold on day i comes from either hold of day i - 1 or cooldown on day i - 1 and buy on day i
    hold = Math.max(prevHold, prevCooldown - price);
  }

  // action on final trading day must be either sell or cooldown
  return Math.max(sell, cooldown);
};

// Time: O(n)
// Space: O(n)

/**
 * Brute Force - DFS
 * Can either buy or cooldown, or sell or cooldown, Time: O(2^n) where n is height of tree (length of prices)
 */
