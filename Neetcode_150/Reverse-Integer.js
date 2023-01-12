/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  // if x is negative, return negative of function on positive x
  if (x < 0) return -reverse(Math.abs(x));

  const MAX = 2 ** 31 - 1;

  let res = 0;

  while (x) {
    // pop last digit off x
    let digit = x % 10;
    x = Math.floor(x / 10);

    // shift res to the left and add digit
    res = res * 10 + digit;

    // check res still in range
    if (res > MAX) return 0;
  }
  return res;
};

// Time: O(n)
// Space: O(1)
