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
