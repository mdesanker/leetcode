/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Neetcode adaptation
var maxSlidingWindow = function (nums, k) {
  const q = []; // stores *indices*
  const res = [];

  let left = 0,
    right = 0;

  while (right < nums.length) {
    // pop smaller values than current right char from q
    while (q && nums[q[q.length - 1]] < nums[right]) {
      // nums[q[q.length - 1]] === values in nums of last index in q
      q.pop();
    }
    // push next index onto q
    q.push(right);

    // remove left val from window
    if (q[0] === right - k) {
      q.shift();
    }

    // if window has k elements, add to results
    if (right + 1 >= k) {
      res.push(nums[q[0]]); // push largest element in queue
      left++;
    }
    right++;
  }
  return res;
};

// Time: O(n)
// Space: O(k)

/**
Brute force implementation:
Start at every index, and check for the max of the next k numbers and push to the result array.

TC: O(n * k) will need two nested loops, one to iterate through nums array, and then one to iterate over next k elements
SC: O(1) will need a variable to store the max in every window

Optimal solution:
Use a monotonic decreasing queue to keep track of index of largest number in window. 
When we add a new number, we pop all smaller numbers from the queue. 
When the largest number is out of range, we shift it from the queue.
Once we have k elements in the window, we push the largest num (nums[q[0]] because q holds indices) onto result array

Initialize l and r pointer at beginning of nums, a result array, and a queue array.

While r pointer is in bounds

In order to push a value onto the q, we need to remove any smaller values.
So while q is not empty and the num at the index of the last value in q is less than the value at r pointer, pop from q
The push current value onto q.

Then we need to remove the first value in the q if it is out of range of the window. 
Check if q[0] is equal to r - k and remove first element in q with shift.


If the window has at least k values ( r + 1 >= k) then we can push the max onto the result array and increment l pointer

Before loop ends, increment right pointer

TC: O(n) nums array is interated through once
SC: O(k) if nums array is in decreasing order, then could have a full window of nums in queue
 */

// https://leetcode.com/problems/sliding-window-maximum/solutions/871317/clear-thinking-process-with-picture-brute-force-to-mono-deque-python-java-javascript/?orderBy=most_votes&languageTags=javascript
var maxSlidingWindow = function (nums, k) {
  const q = []; // stores *indices*
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // pop smaller values from q
    while (q && nums[q[q.length - 1]] <= nums[i]) {
      q.pop();
    }
    q.push(i);

    // remove first element if it's outside the window
    if (q[0] === i - k) {
      q.shift();
    }

    // if window has k elements add to results (first k-1 windows have < k elements because we start from empty window and add 1 element each iteration)
    if (i >= k - 1) {
      res.push(nums[q[0]]);
    }
  }
  return res;
};
