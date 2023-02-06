// leetcode.com/problems/kth-largest-element-in-a-stream/solutions/1328108/javascript-13-lines-heap-solution-76-43/

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  // Use available JS library to create min heap
  this.minHeap = new MinPriorityQueue();
  this.k = k;
  // add elements from nums into heap
  for (let num of nums) this.minHeap.enqueue(num);
  // remove min elements while size of heap > k
  while (this.minHeap.size() > this.k) this.minHeap.dequeue().element;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  // add val to heap
  this.minHeap.enqueue(val);
  // if heap too large, remove smallest element
  if (this.minHeap.size() > this.k) this.minHeap.dequeue().element;
  // return smallest element in heap
  return this.minHeap.front().element;
};

// Time: O((n - k)log(n)) log n to remove elements, repeated n - k times for number of elements added. O(nlog(n)) worst case scenario
// Space: O(k) heap will hold k elements

/**
With heaps, when we want to find the largest we need a min heap, and when we want to find the smallest, we need a max heap. A little counterintuitive
A min heap means that the heap will remove/find the smallest element (max heap is the same for largest element)
Min heap will find the smallest element stored in O(1) time, and addition/removal of elements if O(logn) time
Removing elements from the queue, removes the smallest element first

Initialize:
Create a new min priority queue
Assign k to a variable on the constructor
We add every num in the nums array to the heap, and then remove nums if there are too many

e.g. nums = [6, 2, 3, 1, 7] and k = 3;
minHeap = [1, 2, 3, 6, 7]
Remove elements to length = k
minHeap = [3, 6, 7];
The first element in the minHeap is the 3rd largest element in the stream

Add:
Add the new val then check if there are too many and remove an element if needed
(Can use if statement instead of while loop here because there has only been a single value added)
Return the value in the front of the min heap

TC: O(nlogn + mlogk)
  Turnining nums into heap: to turn nums array into a heap of size k, we have to insert n nums into the heap. Heap insertion is logn done n times
  is nlogn. Then we remove n - k elements to reduce the size of the heap to k. If k is n - 1, then we have to add every element, and then remove almost
  every element. This will be about 2nlogn time, which is reduce to nlogn to build the heap
  In the worst case, every "add" call will insert an element, and then remove an element from the heap, and since heap is of size k O(2logk).
  This is simplified to O(logk). If there are m add calls, then we add O(mlogk) to the time complexity
SC: O(n) only extra memory needed is for the heap, in the initialization call the heap is n elements large, 
  but is then reduced to k elements from then on
 */
