/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  let n = num.length - 1;
  const res = [];

  // loop until we reach end of num array or until k is consumed
  while (n >= 0 || k > 0) {
    // add k to element in num, starting at end
    if (n >= 0) {
      let sum = num[n] + k;
      // push last digit of sum onto array
      res.push(sum % 10);
      // if there is a carry, we make k the carry
      k = Math.floor(sum / 10);
      // decrement pointer
      n--;
    } else {
      // if we have reached beginning of array, then add carrys (k) if any
      // same process as before, add last digit to res, and carry remainder
      res.push(k % 10);
      k = Math.floor(k / 10);
    }
  }
  // reverse the res array to put digits in correct order
  return res.reverse();
};

// Time: O(max(n, k)) iterate through n or k, whichever is longer
// Space: O(max(n, k)) res will be the length of the longer number + 1 at max
