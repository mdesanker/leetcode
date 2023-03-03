/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

/**
Key Insight:
First consider scenario where find kth smallest element in 2 sorted arrays (this is just same situation with multiple arrays)
We use a pointer at beginning of each array, check which value is smaller, and increment pointer at smaller value until we reach kth
We can't use n pointers, so we can simulate this with a minHeap
 */

var kthSmallest = function (matrix, k) {
  const n = matrix.length;

  // add first element of every row to minHeap, unless k is less than n, then we only need first k elements
  // we will store element value and its coordinates
  const minHeap = new MinPriorityQueue();
  for (let r = 0; r < Math.min(k, n); r++) {
    minHeap.enqueue([matrix[r][0], r, 0], matrix[r][0]);
  }

  // remove smallest element from minHeap, which will tell us with row to add next element from
  // (equivalent to moving pointer in the 2 array scenario)
  while (k) {
    const [el, r, c] = minHeap.dequeue().element;

    if (c < n - 1)
      minHeap.enqueue([matrix[r][c + 1], r, c + 1], matrix[r][c + 1]);

    k--;

    // keep iterating until exhausted k elements
    // answer is last element popped from heap
    if (k === 0) return el;
  }
};

/**
x = min(k, n) 

Time: O(x + klogx)
    Adding elements to heap is O(x) instead of O(xlogx) because the elements are already sorted
    Add and remove k elements from heap to find kth min O(klogx) 
Space: O(x) for the heap
 */
