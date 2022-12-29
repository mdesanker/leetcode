/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;

  // iterate through stirng and use every char as mid point for palindrome
  for (let i = 0; i < s.length; i++) {
    // odd length
    let l = i,
      r = i;
    // expand outward as long as within bounds and valid palindrome increase count
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }

    // even length
    (l = i), (r = i + 1);
    // expand outward as long as within bounds and valid palindrome increase count
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }
  return count;
};

// Time: O(n^2) iterate through s once, and check breadth of s for every position
// Space: O(1)
