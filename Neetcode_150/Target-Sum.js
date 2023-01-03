/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  // create cache to store previous values
  const cache = new Map();

  // helper function
  // i tracks index in nums array
  // total tracks current sum
  function dfs(i, total) {
    // generate unique key for index and total combination
    const key = `${i}#${total}`;

    // base case
    // if reached end of nums array and total = target return 1, else 0
    if (i >= nums.length) {
      if (total === target) return 1;
      return 0;
    }
    // if value has already been cached, return
    if (cache.has(key)) return cache.get(key);

    // iterate over both options, add or subtract
    let plus = dfs(i + 1, total + nums[i]);
    let minus = dfs(i + 1, total - nums[i]);
    let coount = plus + minus;

    cache.set(key, coount);
    return coount;
  }

  return dfs(0, 0);
};

// Time: O(n * t) t = sum(nums), n = nums.length
// Space: O(n * t) depth of tree can go up to n. cache holds t * n elements

/**
 * Brute force
 * Time: O(2^n) where n is nums.length
 */
