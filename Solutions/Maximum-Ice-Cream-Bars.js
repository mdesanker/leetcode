/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
// Sort implementation
var maxIceCream = function (costs, coins) {
  costs.sort((a, b) => a - b);

  let count = 0;

  for (let cost of costs) {
    if (cost <= coins) {
      coins -= cost;
      count++;
    } else break;
  }
  return count;
};

// Time: O(nlogn)
// Space: O(1)

// Heap implementation
var maxIceCream = function (costs, coins) {
  const minHeap = new MinPriorityQueue();
  for (let cost of costs) minHeap.enqueue(cost);

  let count = 0;

  while (minHeap.size()) {
    const cost = minHeap.dequeue().element;
    if (cost <= coins) {
      coins -= cost;
      count++;
    } else break;
  }
  return count;
};

// Time: O(nlogn)
// Space: O(n)
