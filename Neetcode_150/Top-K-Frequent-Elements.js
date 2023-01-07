/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Bucket Sort Implementation
const topKFrequent = function (nums, k) {
  const count = new Map(),
    bucket = [];

  // map the frequencies of each element in count hash
  for (let num of nums) {
    count.set(num, count.get(num) + 1 || 1);
  }

  // for each property in count, set the index of the freq to a set of the num (remove duplicates)
  for (let [num, freq] of count) {
    bucket[freq] = (bucket[freq] || new Set()).add(num);
  }

  const res = [];

  // iterate through the bucket backwards to get the most frequent elements
  for (let i = bucket.length - 1; i >= 0; i--) {
    // add the entire bucket to res array
    if (bucket[i]) res.push(...bucket[i]);
    // if bucket length === k, done
    if (res.length === k) return res;
  }
};

/*
Time: O(N)
Space: O(N)
*/

// Heap Implementation
var topKFrequentHeap = function (nums, k) {
  const count = new Map();
  for (let num of nums) count.set(num, count.get(num) + 1 || 1);

  const maxHeap = new MaxPriorityQueue();
  for (let [key, val] of count) maxHeap.enqueue(key, val);

  const res = [];
  while (res.length < k) res.push(maxHeap.dequeue().element);
  return res;
};

// Time: O(nlogn) each heap operation is logn, done n times
// Space: O(n)
