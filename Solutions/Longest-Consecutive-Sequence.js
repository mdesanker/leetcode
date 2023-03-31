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

/** 
Build a set from nums array to so that we have O(1) lookup time for numbers.
Iterate through nums array
Check that the current num doesn't have any previous values in the set, if it does, then you can't build a potentially longest sequence
Once you find a num with no previous values, initialize length counter at 0;
Using a while loop, check that the value of num + length exists in the set and increment the length counter
Once you have reached the end of the current subsequence, check if it is longer than the current max length (initialized to 0);

TC: O(n) building the set is linear operation, then interating through nums array is another linear operation. 
Checking for values in set is constant time operation
SC: O(n) size of set will be the length of nums array if every value is unique
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
