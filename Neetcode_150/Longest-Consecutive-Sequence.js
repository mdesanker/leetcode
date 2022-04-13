/**
 * @param {number[]} nums
 * @return {number}
 */

const longestConsecutive = function (nums) {
  const numSet = new Set(nums);
  let longest = 0;
  for (let num of nums) {
    // if prev number is does not exist in set, num is a valid starting point
    if (!numSet.has(num - 1)) {
      // start length counter for this sequence
      let length = 0;
      // while next consecutive number exists in set, increment length
      while (numSet.has(num + length)) {
        length++;
      }
      // compare to maximum length
      longest = Math.max(longest, length);
    }
  }
  return longest;
};

/*
Time: O(N)
Space: O(N)
*/

// Implementation with hashmap instead of set
const longestConsecutiveHash = function (nums) {
  const numHash = {};

  // populate numHash with only unique values
  for (let num of nums) {
    if (!numHash.hasOwnProperty(num)) {
      numHash[num] = 1;
    }
  }

  let longest = 0;
  for (let num of nums) {
    // check that num is a valid starting point
    if (!numHash.hasOwnProperty(num - 1)) {
      let length = 0;
      // while next consecutive number exists in set, increment length
      while (numHash.hasOwnProperty(num + length)) {
        length++;
      }
      // compare length against longest
      longest = Math.max(longest, length);
    }
  }

  return longest;
};
