/**
 * @param {number[]} nums
 * @return {number}
 */
// Recursion
var lengthOfLIS = function (nums) {
  const n = nums.length;

  function dp(i, prev) {
    if (i === n) return 0;
    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return Math.max(take, notTake);
  }
  return dp(0, -1);
};
// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const memo = [...new Array(n)].map(() => new Array(n + 1).fill(-1));

  function dp(i, prev) {
    if (i === n) return 0;

    // cache check must come after base case
    if (memo[i][prev + 1] !== -1) return memo[i][prev + 1];

    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return (memo[i][prev + 1] = Math.max(take, notTake));
  }
  return dp(0, -1);
};
// Time: O(n^2)
// Space: O(n^2 + n)

// Recursion + Memoization [Memory overflow]
var lengthOfLIS = function (nums) {
  const n = nums.length;
  // javascript objects take more memory than arrays, so this solution overflows
  const memo = {};

  function dp(i, prev) {
    if (i === n) return 0;

    const key = `${i}#${prev}`;
    if (key in memo) return memo[key];

    let notTake = dp(i + 1, prev);
    let take = 0;
    if (prev === -1 || nums[i] > nums[prev]) take = 1 + dp(i + 1, i);
    return (memo[key] = Math.max(take, notTake));
  }
  return dp(0, -1);
};
// Time: O(n^2)
// Space: O(n^2 + n)

// Tabulation
var lengthOfLIS = function (nums) {
  const n = nums.length;

  const dp = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= -1; j--) {
      let notTake = dp[i + 1][j + 1];
      let take = 0;
      if (j === -1 || nums[i] > nums[j]) take = 1 + dp[i + 1][i + 1];
      dp[i][j + 1] = Math.max(take, notTake);
    }
  }
  return dp[0][0];
};
// Time: O(n^2)
// Space: O(n^2)

// Tabulation - Optimized
var lengthOfLIS = function (nums) {
  const n = nums.length;

  let dp = new Array(n + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let temp = new Array(n + 1).fill(0);
    for (let j = i - 1; j >= -1; j--) {
      let notTake = dp[j + 1];
      let take = 0;
      if (j === -1 || nums[i] > nums[j]) take = 1 + dp[i + 1];
      temp[j + 1] = Math.max(take, notTake);
    }
    dp = temp;
  }
  return dp[0];
};
// Time: O(n^2)
// Space: O(n)

// Optimal Tabulation
var lengthOfLIS = function (nums) {
  const n = nums.length;

  let dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
  }
  return Math.max(...dp);
};
// Time: O(n^2)
// Space: O(n)

// Binary Search
var lengthOfLIS = function (nums) {
  const temp = [nums[0]];
  // optiona: store length in variable so don't have to spend time doing length calc at end
  let len = 1;
  for (let i = 1; i < nums.length; i++) {
    // nums[i] greater than last element
    if (nums[i] > temp[temp.length - 1]) {
      temp.push(nums[i]);
      len++;
      // nums[i] smaller than last element
    } else {
      // must pass temp array otherwise the reference gets messed up
      const ind = binarySearch(temp, nums[i]);
      temp[ind] = nums[i];
    }
  }
  return len;

  // binary search to return index of equal or next largest element
  function binarySearch(nums, num) {
    let l = 0,
      r = len - 1;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      // if element is equal or greater, move r pointer
      if (nums[mid] >= num) {
        r = mid;
        // if number is smaller, need to move l pointer to mid + 1
      } else {
        l = mid + 1;
      }
    }
    return l;
  }
};

// Time: O(nlogn) iterate through nums array O(n) and potentially do binary search at every index O(logn)
// Space: O(n) for temp array
