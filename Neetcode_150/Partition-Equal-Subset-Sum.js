/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // if sum is odd, can't create half array using integers
  let sum = nums.reduce((acc, curr) => acc + curr);
  if (sum % 2 === 1) return false;

  let dp = new Set();
  // can add up to 0 if don't choose any values from nums
  dp.add(0);

  // find if half the total sum can be created
  let target = sum / 2;

  // iterate through nums in reverse adding each new value to every value in dp set
  for (let i = nums.length - 1; i >= 0; i--) {
    // can't iterate through set while modifying it
    let nextDP = new Set();
    // iterate through every value of dp set
    for (let t of dp) {
      if (t + nums[i] === target) return true;
      // new set doesn't have value from original dp, so re-add
      nextDP.add(t);
      // add nums to every value in dp set
      nextDP.add(t + nums[i]);
    }
    // overwrite dp with new dp
    dp = nextDP;
  }
  // return true if target exists in set
  return dp.has(target);
};

// n = nums.length

// Time: O(n * sum(nums)) simplified from O(n * sum(nums)/2)
// Space: O(sum(nums))

/**
 * Brute force
 * Time: O(2^n)
 */
