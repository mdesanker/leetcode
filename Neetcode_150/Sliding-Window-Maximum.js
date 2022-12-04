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

// Time: O(N)
// Space: O(N)

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
