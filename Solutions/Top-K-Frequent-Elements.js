/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Max Heap
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let num of nums) map.set(num, map.get(num) + 1 || 1);

  const maxHeap = new MaxPriorityQueue();
  for (let [val, freq] of map) maxHeap.enqueue(val, freq);

  const res = [];
  for (let i = 0; i < k; i++) res.push(maxHeap.dequeue().element);
  return res;
};
// TC: O(nlogn)
// SC: O(n)

// Min Heap
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let num of nums) map.set(num, map.get(num) + 1 || 1);

  const minHeap = new MinPriorityQueue();
  for (let [val, freq] of map) {
    minHeap.enqueue(val, freq);
    if (minHeap.size() > k) minHeap.dequeue().element;
  }

  return minHeap.toArray().map((x) => x.element);
};
// TC: O(nlogk)
// SC: O(n)

// Bucket Sort
var topKFrequent = function (nums, k) {
  const map = new Map(),
    bucket = [];
  for (let num of nums) map.set(num, map.get(num) + 1 || 1);

  for (let [val, freq] of map) {
    bucket[freq] = (bucket[freq] || new Set()).add(val);
  }

  const res = [];
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) res.push(...bucket[i]);
    if (res.length === k) return res;
  }
};
// TC: O(n)
// SC: O(n)
