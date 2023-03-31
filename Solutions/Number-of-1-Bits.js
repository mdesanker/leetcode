/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let res = 0;
  // 32 bit integer will have 32 digits
  for (let i = 0; i < 32; i++) {
    // last digit is 0, add 0 to res
    // last digit is 1, add 1 to res
    res += n & 1;
    // bit shift n to the right by 1
    n = n >> 1;
  }
  return res;
};

// Time: O(1) loop always runs 32 times
// Space: O(1)

var hammingWeight = function (n) {
  let res = 0;
  while (n) {
    res++;
    // subtract 1 from n and & with previous n
    n = n & (n - 1);
  }
  return res;
};

// Time: O(1) loop always runs 32 times
// Space: O(1)
