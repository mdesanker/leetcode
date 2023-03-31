/**
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
var minStoneSum = function (piles, k) {
  const maxHeap = new MaxPriorityQueue();
  let sum = 0;
  for (const pile of piles) {
    maxHeap.enqueue(pile);
    sum += pile;
  }

  for (let i = 0; i < k; i++) {
    const max = maxHeap.dequeue().element;
    const newMax = Math.ceil(max / 2);
    maxHeap.enqueue(newMax);
    sum -= max - newMax;
  }
  return sum;
};

// Time: O( n * klogn) convert array to heap in linear time, each heap operation is log n, perform k heap operations
// Space: O(n) where n is number of piles (size of heap)
