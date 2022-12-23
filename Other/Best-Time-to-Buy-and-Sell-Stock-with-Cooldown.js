// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solutions/740050/easy-100-speed-o-1-space-python-c-java-javascript/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var buy = 2147483647; // 2^31 - 1
  var free = 0,
    last = 0,
    now = 0;
  prices.forEach((x) => {
    now = Math.max(last, x - buy);
    buy = Math.min(buy, x - free);
    free = last;
    last = now;
  });
  return now;
};
