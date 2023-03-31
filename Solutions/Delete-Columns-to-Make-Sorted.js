/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  let res = 0;

  // iterate over each char in str
  for (let j = 0; j < strs[0].length; j++) {
    // iterate over each str in strs
    for (let i = 1; i < strs.length; i++) {
      // if char has smaller value than previous char, not in order so increment res counter
      if (strs[i][j] < strs[i - 1][j]) {
        res++;
        break;
      }
    }
  }
  return res;
};

// Time: O(n * m) n is strs.length, m is str[0].length
// Space: O(1)
