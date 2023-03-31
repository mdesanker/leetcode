/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const res = new Set();
  const curr = [];

  function backtrack(ind) {
    // push to res if at end of nums array and curr is atleast 2 elements long
    if (ind >= nums.length) {
      if (curr.length >= 2) {
        // convert array to string to check for duplicates
        res.add(JSON.stringify(curr));
      }
      return;
    }

    for (let i = ind; i < nums.length; i++) {
      // push value to curr if empty or if >= previous number
      if (curr.length === 0 || nums[i] >= curr[curr.length - 1]) {
        curr.push(nums[i]);
        backtrack(i + 1);
        curr.pop();
      }
      backtrack(i + 1);
    }
  }
  backtrack(0);
  // convert set to array and map strings into arrays
  return Array.from(res).map(JSON.parse);
};

// Time: O(n * 2^n) 2^n because either include or exclude each element in nums (n) and multiplied by n for size of each subsequence
// Space: O(n * 2^n)

var findSubsequences2 = function (nums) {
  const res = [];
  const curr = [];

  function backtrack(ind) {
    if (curr.length >= 2) {
      res.push(curr.slice());
    }

    const unique = new Set();

    for (let i = ind; i < nums.length; i++) {
      if (nums[i] < nums[ind - 1]) continue;

      if (unique.has(nums[i])) continue;
      unique.add(nums[i]);

      curr.push(nums[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }
  backtrack(0);
  return res;
};
