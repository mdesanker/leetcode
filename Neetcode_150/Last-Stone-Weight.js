// Max Heap Implementation
// https://leetcode.com/problems/last-stone-weight/solutions/2123710/javascript-simple-priority-queue/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  // built in max heap class
  const maxHeap = new MaxPriorityQueue();

  // add each stone to heap
  for (const stone of stones) maxHeap.enqueue(stone);

  while (maxHeap.size() > 1) {
    const s1 = maxHeap.dequeue().element;
    const s2 = maxHeap.dequeue().element;

    // if weights not equal, add difference as new stone
    if (s1 !== s2) maxHeap.enqueue(s1 - s2);
  }

  // if queue is empty (last two stones same size) return 0, otherwise return remaining stone
  return maxHeap.size() === 0 ? 0 : maxHeap.front().element;
};

// Time: O(nlogn) where n is number of stones to add to heap
// Space: O(n)

/**
A max heap will easily help us keep the stones in order so we can choose the heaviest two stones to smash together
Adding elements to the heap is O(logn) time complexity, and is repeated for every stone

We want to smash stones until we either have one or no stones remaining (if the last two stones are the same size they will both be destroyed)
While the heap is larger than one
Pop the two largest stones
If they are the same size, then both of their weights are removed from the heap
If they are not the same size, then we add the difference back to the heap

Once heap size has been reduced, we either return 0 if there are no remaining stones, or the weight of the last stone by returning the 
element at front of heap

TC: O(nlogn) to build the heap, then nlogn as we remove all elements from the heap
SC: O(n) the heap initially holds every stone in the stones array
 */

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
