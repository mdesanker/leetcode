// leetcode.com/problems/kth-largest-element-in-a-stream/solutions/1328108/javascript-13-lines-heap-solution-76-43/

/**
 * @param {number} k
 * @param {number[]} nums
 */
https: var KthLargest = function (k, nums) {
  // Use available JS library to create min heap
  this.minHeap = new MinPriorityQueue();
  this.k = k;
  // add elements from nums into heap
  for (const num of nums) {
    this.minHeap.enqueue(num);
  }
  // remove min elements while size of heap > k
  while (this.minHeap.size() > k) {
    this.minHeap.dequeue().element;
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  // add val to heap
  this.minHeap.enqueue(val);
  // if heap too large, remove smallest element
  if (this.minHeap.size() > this.k) {
    this.minHeap.dequeue().element;
  }
  // return smallest element in heap
  return this.minHeap.front().element;
};

// Time: O((n - k)log(n)) log n to remove elements, repeated n - k times for number of elements added. O(nlog(n)) worst case scenario
// Space: O(k) heap will hold k elements

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
