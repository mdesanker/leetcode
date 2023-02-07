var MedianFinder = function () {
  // median of array will be max of smallHeap and min of largeHeap, which will be O(1) time complexity
  this.low = new MaxPriorityQueue();
  this.high = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // add to max heap
  this.lo.enqueue(num);
  // balancing step
  this.hi.enqueue(this.lo.dequeue().element);

  // maintain similar heap size
  if (this.lo.size() < this.hi.size()) {
    this.lo.enqueue(this.hi.dequeue().element);
  }
};

// Time: O(logn) worst case, there are 3 heap insertions and 2 heap deletions from the top, each taking O(logn) time
// Space: O(n) memory needed is the size of list

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  // if odd number of nums, return top of `low`
  // if even number of nums, return average of top of `low` and `high`
  return this.lo.size() > this.hi.size()
    ? this.lo.front().element
    : (this.lo.front().element + this.hi.front().element) / 2;
};

// Time: O(1) Finding max of left heap is O(1), finding min of right heap is O(1)
// Space: O(1) we do not store any values in the heaps in this step

/**
Using two heaps of equivalent size allows us O(1) access to the median of the stream of data
One heap will hold all values <= to the median, and one heap will hold all values greater than the median
We will use a max heap to store the smaller values, and a min heap to store the larger values. 
This way the median values will be at the tops of the heaps

Initialize:
Initialize low as a max heap and high as a min heap

Add Number:
The max heap 'low' is allowed to store, at worst, one more element than the min heap, high
We add num to max heap 'low' first
Since 'low' has received a new number, we do a balancing step with 'high', and offer it the largest element from 'low'
The min heap 'high' might end up holding more elements than the max heap 'low'. Fix this by removing smallest element from 'high' and offering to 'low'
This ensures we do not disturb the property that difference in size between the two heaps should not be greater than 1, 
and 'low' should be equal to or greater than 'high' in size

TC: O(logn) all heap operations are logn time complexity. There are, at worst, three heap additions, and two heap deletions: 5logn reduces to logn
SC: O(n) linear space needed to store every num 

Find Median:
The top of each heap is now accessible in O(1) time.
If both heaps are the same size, then we have an even number of nums, so we return the average of the top of both heaps.
If 'low' is larger than 'high', then we have an odd number of nums, so we return the top of the 'low' heap which will be larger than 'high'

TC: O(1) returning top of each heap is constant time operation
SC: O(1) no elements are stored
 */
