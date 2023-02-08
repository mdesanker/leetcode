/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  // palindrome helper function
  function isPalindrome(l, r) {
    while (l <= r) {
      if (s[l] !== s[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true;
  }

  let l = 0,
    r = s.length - 1;
  while (l < r) {
    // found mismatched pair, test both deletions
    if (s[l] !== s[r]) {
      return isPalindrome(l + 1, r) || isPalindrome(l, r - 1);
    }
    l++;
    r--;
  }
  return true;
};

// Time: O(n) iterate through s once
// Space: O(1) no additional memory needed
