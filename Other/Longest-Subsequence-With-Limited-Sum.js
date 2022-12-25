// https://leetcode.com/problems/longest-subsequence-with-limited-sum/solutions/2500113/beginner-friendly-java-javascript-python-solution/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  // sort nums
  nums.sort((a, b) => a - b);
  const res = [];
  // iterate through each element of queries
  for (const query of queries) {
    // track sum and count of elements
    let sum = 0,
      count = 0;
    for (const num of nums) {
      // gradually add num while sum <= query
      if (sum + num <= query) {
        sum += num;
        // increment count
        count++;
      }
    }
    // push count to result array
    res.push(count);
  }
  return res;
};

// Time: O(n^2)
// Space: O(q) where q is length of queries
