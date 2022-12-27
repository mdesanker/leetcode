/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Bellman - Ford
  // create array for every node and set cost to get to each node to inifinity for each except source node
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  // loop will run k + 1 times where k is number of stops
  for (let i = 0; i < k + 1; i++) {
    // copy price array so can compare against original prices
    const tmpPrices = prices.slice();

    // s = source, d = destination, p = price
    for (let [s, d, p] of flights) {
      // price of s = Infinity for nodes we cannot reach yet
      if (prices[s] === Infinity) continue;
      // if cost to get to src + cost to get to next node (p) is less than current cost to get tp d, update
      if (prices[s] + p < tmpPrices[d]) {
        tmpPrices[d] = prices[s] + p;
      }
    }
    // set prices to new prices
    prices = tmpPrices;
  }
  // if can't make it to dst in k stops return -1 otherwise return price
  return prices[dst] === Infinity ? -1 : prices[dst];
};

// Time: O(e * k) where e is number of edges and k is number of stops
// Space: O(n) for price and tempPrice arrays
