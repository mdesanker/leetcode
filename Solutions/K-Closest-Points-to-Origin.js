/**
Solution: Min Heap

The min heap solution is perhaps a little more straightforward. 
Iterate through points, calculating their euclidean distance from the origin sqrt(x^2 + y^2)
Then push each coordinate into the heap usinig distance as the priority.

Next, pop the top k elements off the heap into an array to get k closest points

n = points.length
TC: O(nlogn)
SC: O(n)

Solution: Max Heap

Same approach as max heap, except after addition of every point we remove top element if we have more than k elements in heap
This way we reduce time and space complexity if k < n. In worst case scenario, k = n and time and space complexity will be
same as min heap implementation

We can convert the heap to an array in increasing order of distance using: maxHeap.toArray().reverse().map((x) => x.element);

n = points.length
TC: O(nlogk)
SC: O(k)
 */
// Min Heap
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

// Max Heap
var kClosest = function (points, k) {
  const maxHeap = new MaxPriorityQueue();
  for (let [x, y] of points) {
    const dist = Math.sqrt(x * x + y * y);
    maxHeap.enqueue([x, y], dist);
    if (maxHeap.size() > k) maxHeap.dequeue().element;
  }
  return maxHeap
    .toArray()
    .reverse()
    .map((x) => x.element);
};
