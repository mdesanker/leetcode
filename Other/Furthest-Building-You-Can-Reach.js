/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
// Min Heap and Binary Search
var furthestBuilding = function (heights, bricks, ladders) {
  function isReachable(index) {
    const minHeap = new MinPriorityQueue();
    for (let i = 0; i <= index; i++) {
      let climb = heights[i + 1] - heights[i];
      if (climb > 0) minHeap.enqueue(climb);
    }
    let bricksRemaining = bricks,
      laddersRemaining = ladders;
    while (minHeap.size()) {
      const climb = minHeap.dequeue().element;
      if (climb <= bricksRemaining) {
        bricksRemaining -= climb;
      } else if (laddersRemaining > 0) {
        laddersRemaining--;
      } else return false;
    }
    return true;
  }

  let l = 0,
    r = heights.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (!isReachable(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

/**
Time: O(nlog^2n)
  isReachable function potentially iterates through n elements. Each element being pushed into queue, which is O(nlogn)
  Binary search is O(logn)
  isReachable called at every iterationg of binary search so total is O(nlogn) * O(logn) = O(nlog^2n)
Space: O(n) new priority queue created at every iteration
*/

// Min Heap
var furthestBuilding = function (heights, bricks, ladders) {
  const minHeap = new MinPriorityQueue();
  for (let i = 0; i < heights.length - 1; i++) {
    let climb = heights[i + 1] - heights[i];
    console.log(climb);

    // if we do not need to climb, then we can continue
    if (climb <= 0) continue;

    minHeap.enqueue(climb);
    // if we have enough ladders, we can continue;
    if (minHeap.size() <= ladders) continue;

    // otherwise dequeue smallest height being used by a ladder and use bricks
    bricks -= minHeap.dequeue().element;

    // if not enough bricks, this is as far as we can go
    if (bricks < 0) return i;
  }
  // made it to end of array
  return heights.length - 1;
};

// Time: O(nlogn) heap is size l, so pushing to heap is nlogl. Worst case scenario l = n
// Space: O(n) heap is size l, worst case scenario l = n
