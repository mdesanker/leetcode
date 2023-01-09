/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  function helper(x, n) {
    // edge cases for 0 values
    if (x === 0) return 0;
    if (n === 0) return 1;

    // caluclate res for half of n
    const res = helper(x, Math.floor(n / 2));
    // multiply by itself
    res = res * res;
    // if n is odd, need to multiply by an additional x
    return n % 2 === 0 ? res : x * res;
  }

  // call helper with abs value of n
  const res = helper(x, Math.abs(n));
  // divide 1 by res if n is odd
  return n >= 0 ? res : 1 / res;
};

// Time: O(logn)
// Space: O(1)

// TIME LIMIT EXCEEDED
var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  let res = 1;
  for (let i = 0; i < n; i++) {
    res *= x;
  }
  return res;
};

// Time: O(n)
// Space: O(1)
