/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  function backtrack(i, curr) {
    // base case: out of bounds of nums array
    // i is index of number currently at
    if (i >= nums.length) {
      // push copy of subset to res array
      res.push(curr.slice());
      return;
    }

    // decision to pick nums[i]
    curr.push(nums[i]);
    backtrack(i + 1, curr);

    // decision to not pick nums[i];
    curr.pop(); // backtrack
    backtrack(i + 1, curr);
  }
  backtrack(0, []);
  return res;
};

// Time: O(n * 2^n) 2^n subsets will be generated, then each subset can be of length n
// Space: O(n) to track curr array

/**
We will move through the nums array, and either pick or not pick the value at index i to add to the curr subset
Once we have moved through all nums, we will push the subsets onto the res array

Initialize global res array to hold all subsets

Backtrack function:
Parameters: 
i so we know which value in nums we are considering
curr is the current subset

Base case:
Once we have considered all elements in nums, we can push the subset onto res
We have considered all the elements in nums when the index pointer has moved to the end of the array
We push a copy of the curr subset, because JS uses references to arrays and the previously pushed arrays would be modified

Recursive steps:
When we are at a num, we either want to pick it or not pick it to add to the subset

If we pick the num
Push the num onto the curr subset
Then we recursively call backtrack function while incrementing the index

If we don't pick the num
We pop the num from the curr subset
Then we recursively call backtrack function while incrementing the index

We call the backtrack function starting at index 0 and with an empty array for the initial subset

TC: O(n * 2^n) We have 2 choices for every element in nums array (n) => 2^n (the number of subsets)
  Every subset can be up to length n. Therefore overall time complexity is O(n * 2^n)
SC: O(n) linear space to maintain curr, which will be length n in worst case
 */
