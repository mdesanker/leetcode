/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = "",
    resLength = 0;

  // iterate through every char in string and treat as center of palindrome
  for (let i = 0; i < s.length; i++) {
    // odd length palindromes
    let l = i,
      r = i;
    // while have valid palindrome
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      // if current length is greater than stored resLength, upate res and resLength
      if (r - l + 1 > resLength) {
        res = s.slice(l, r + 1);
        resLength = r - l + 1;
      }
      // update pointers
      l--;
      r++;
    }

    // even length palindromes
    (l = i), (r = i + 1);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      // if current length is greater than stored resLength, upate res and resLength
      if (r - l + 1 > resLength) {
        res = s.slice(l, r + 1);
        resLength = r - l + 1;
      }
      // update pointers
      l--;
      r++;
    }
  }
  return res;
};

// Time: O(n^2) for each char (n) iterate outwards to potentially length n to check if palindrome
// Space: O(1)
