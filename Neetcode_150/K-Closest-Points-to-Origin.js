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

// Time: O(nlogn)
// Space: O(n)

/**
We want to sort points in order of closeness to origin, so we will use a minHeap to prioritize the closest elements
For each point, we will calculate the distance to the origin using the formula provided in the description
[x2, y2] is [0, 0] in this case, so the formula is:

Math.sqrt(x**2 + y**2);

The second parameter in the heap.enqueue() function is the weight we want to apply to that element
We pass the distance here, since we are storing arrays in the queue, which the queue cannot handle innately

Then we will build a result array with the k closest elements

While res.length is less than k, we take the smallest element from the heap and push it onto res array

TC: O(nlogn) we have to build a heap with every point in point array. Addition to heap is logn time, repeated n times for every coordinate
SC: O(n) the heap will hold every coordinate pair
 */
