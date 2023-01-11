/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // find the last bit of n
    const lastBit = n & 1;
    // shift the last bit of n to the left
    const reversedLastBit = lastBit << (31 - i);
    // insert the reversed last bit of n into the result
    result |= reversedLastBit;
    // the last bit of n is already taken care of, so we need to drop it
    n >>>= 1;
  }
  // convert the result to an unsigned 32-bit integer
  return result >>> 0;
};

// Time: O(1)
// Space: O(1)
