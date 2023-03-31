/**
 * @param {number[]} nums
 * @return {boolean}
 */

const containsDuplicate = function (nums) {
  const charFreq = {};

  for (let num of nums) {
    if (charFreq.hasOwnProperty(num)) {
      return true;
    } else {
      charFreq[num] = 1;
    }
  }
  return false;
};

/*
Time: O(N)
Space: O(N)
*/

/**
 * Explanation
 *
 * Brute force:
 * Use two for-loops to check every combination of two numbers in the array - for i = 0,
 * check if it matches j = 1, j = 2, ... j = n - 1; then check i = 1 with j = i + 1, ..., j = n - 1.
 * This takes O(n^2) time complexity because there is a nested for-loop.
 *
 * Linear time complexity solution:
 * Use a hashmap to store nums that have been visited and their frequency of occurence.
 * Iterate through nums, and check if the hashmap already has this num as a key, if so, then return true immediately, a duplicate has been found.
 * If hashmap does not have the key, add num as a key and set its frequency to 1.
 * If you get to end of nums array, return false, because no duplicates have been found.
 *
 * TC: O(n) for single pass through nums array
 * SC: O(n) because hashmap will hold every value in nums if there are no duplicates
 */
