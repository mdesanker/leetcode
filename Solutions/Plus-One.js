/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // iterate through digits in reverse
  for (let i = digits.length - 1; i >= 0; i--) {
    // increment digit
    digits[i]++;
    // if digit > 9, need to set to 0 and move to next digit
    if (digits[i] > 9) {
      digits[i] = 0;
      // else return digits
    } else {
      return digits;
    }
  }
  // if made it to end of array, need to push 1 onto beginning of digits
  digits.unshift(1);
  return digits;
};

// Time: O(n)
// Space: O(1)
