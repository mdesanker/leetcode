/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
// Bucket sort
var topKFrequent = function (words, k) {
  const bucket = [],
    count = new Map();
  for (let word of words) {
    count.set(word, count.get(word) + 1 || 1);
  }

  for (let [word, freq] of count) {
    bucket[freq] = (bucket[freq] || new Set()).add(word);
  }

  const res = [];
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) res.push(...[...bucket[i]].sort());
    if (res.length === k) return res;
    else if (res.length > k) return res.slice(0, k);
  }
};
// n = words.length, k = avg size of set in bucket
// TC: O(n + nlogk) ~ O(nlogk)?
// SC: O(n)

// Max heap
var topKFrequent = function (words, k) {
  const count = new Map();
  for (let word of words) {
    count.set(word, count.get(word) + 1 || 1);
  }

  const maxHeap = new MaxPriorityQueue({
    compare: (w1, w2) => {
      // 1 swaps, -1 no change
      if (w1.freq > w2.freq) return -1;
      else if (w1.freq < w2.freq) return 1;
      else return w1.word > w2.word ? 1 : -1;
    },
  });

  for (let [word, freq] of count) {
    maxHeap.enqueue({ word, freq });
  }

  const res = [];
  while (res.length < k) res.push(maxHeap.dequeue().word);
  return res;
};
// TC: O(n + nlogn + klogn) ~ O(nlogn)
// SC: O(n)

// Min heap
var topKFrequent = function (words, k) {
  const count = new Map();
  for (let word of words) {
    count.set(word, count.get(word) + 1 || 1);
  }

  const minHeap = new MinPriorityQueue({
    compare: (w1, w2) => {
      // 1 swaps, -1 no change
      if (w1.freq > w2.freq) return 1;
      else if (w1.freq < w2.freq) return -1;
      else return w1.word > w2.word ? -1 : 1;
    },
  });

  for (let [word, freq] of count) {
    minHeap.enqueue({ word, freq });
    if (minHeap.size() > k) minHeap.dequeue().element;
  }

  return minHeap
    .toArray()
    .reverse()
    .map((x) => x.word);
};
// TC: O(n + nlogk) ~ O(nlogk)
// SC: O(n)
