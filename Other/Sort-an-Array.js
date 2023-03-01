/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  const minHeap = new MinPriorityQueue();

  for (let num of nums) minHeap.enqueue(num);

  const res = [];
  while (minHeap.size()) {
    res.push(minHeap.dequeue().element);
  }
  return res;
};

// Time: O(nlogn) each heap enqueue is logn, and every element is pushed into heap
// Space: O(n)
