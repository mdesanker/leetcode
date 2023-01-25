/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const charMap = {};

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (charMap.hasOwnProperty(diff)) {
      return [i, charMap[diff]];
    } else {
      charMap[nums[i]] = i;
    }
  }
  return [-1, -1];
};

// Time: O(n)
// Space: O(n)

/**
Brute force:
Use two for-loops to check every combination of two numbers to see if their sum
is equal to target. 
TC: O(n^2) for nested for-loops
SC: O(1) no additional data structures are needed to store information

Optimal solution:
Use a hashmap to store nums that have been passed and their index as value.
Iterate through nums array, and calculate the difference between the target and the current num.
If diff exists in the hashmap, return the index of the current num and the diff in hashmap.
Else add the current num to hashmap as key with its index as the value. If get to end of nums array and no valid combination, return [-1, -1]

TC: O(n) iterate through nums array once
SC: O(n) for the hashmap to store the nums of nums array
 */
