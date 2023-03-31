/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
  let res = 0;
  // num tracks the number of 1s
  let countOnes = 0;
  for (let c of s) {
    if (c === "0") {
      // either flip all ones or flip this last char to make valid
      res = Math.min(countOnes, res + 1);
    } else {
      countOnes++;
    }
  }
  return res;
};

// Time: O(n)
// Space: O(1)
