/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const res = [];
  const minHeap = new MinPriorityQueue();

  // add points to minHeap ordered by distance to origin
  for (const point of points) {
    const distance = Math.sqrt(point[0] ** 2 + point[1] ** 2);
    minHeap.enqueue(point, distance);
  }

  // fill res with k closest points
  while (res.length < k) {
    res.push(minHeap.dequeue().element);
  }

  return res;
};

// Time: O(nlogk)
// Space: O(n)
