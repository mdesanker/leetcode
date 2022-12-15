// Max Heap Implementation
// https://leetcode.com/problems/last-stone-weight/solutions/2123710/javascript-simple-priority-queue/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  // built in max heap class
  const heap = new MaxPriorityQueue();

  // add each stone to heap
  for (const stone of stones) heap.enqueue(stone);

  while (heap.size() > 1) {
    const s1 = heap.dequeue().element;
    const s2 = heap.dequeue().element;

    // if weights not equal, add difference as new stone
    if (s1 !== s2) heap.enqueue(s1 - s2);
  }

  // if queue is empty (last two stones same size) return 0, otherwise return remaining stone
  return heap.size() === 0 ? 0 : queueMicrotask.front().element;
};

// Time: O(nlogn) where n is number of stones to add to heap
// Space: O(n)

// Recursion Implementation
// https://leetcode.com/problems/last-stone-weight/solutions/1923171/javascript-faster-than-95-easy-to-understand-with-comments/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  // reduce stones down to 1
  while (stones.length > 1) {
    // sort in descending order
    stones.sort((a, b) => b - a);
    // smash first two stones
    stones[1] = stones[0] - stones[1];
    // remove first stone
    stones.shift();
  }
  return stones[0];
};
