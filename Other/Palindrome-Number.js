/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false;

  // save value of x for final comparison
  let temp = x;

  // build reverse of x
  let reverse = 0;
  while (x > 0) {
    let digit = x % 10;
    x = Math.floor(x / 10);
    reverse = reverse * 10 + digit;
  }

  return reverse === temp;
};

// Time: O(n)
// Space: O(1)
