/**
 * @param {string} s
 * @return {number}
 */

const lengthOfLongestSubstring = function (s) {
  let start = 0,
    length = 0,
    charMap = {};

  // extend sliding window
  for (let end = 0; end < s.length; end++) {
    let rightChar = s[end];

    // if rightChar in map, jump window forward
    if (rightChar in charMap) {
      start = Math.max(start, charMap[rightChar] + 1);
    }

    // add rightChar to map
    charMap[rightChar] = end;

    // store max length
    length = Math.max(length, end - start + 1);
  }
  return length;
};

/*
Time: O(N)
Space: O(N)
*/
