/**
 * @param {number[]} sticks
 * @return {number}
 */
var connectSticks = function (sticks) {
  if (sticks.length <= 1) return 0;

  const minHeap = new MinPriorityQueue();
  for (let stick of sticks) minHeap.enqueue(stick);

  let cost = 0;

  while (minHeap.size() > 1) {
    let s1 = minHeap.dequeue().element;
    let s2 = minHeap.dequeue().element;

    cost += s1 + s2;
    minHeap.enqueue(s1 + s2);
  }
  return cost;
};

// Time: O(nlogn) pushing n elements into a heap of size n
// Space: O(n)
