/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  if (str1 + str2 !== str2 + str1) return "";
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return str1.substring(0, gcd(str1.length, str2.length));
};

// Time: O(m + n) to compare two concatenations of length O(m + n)
// Space: O(m + n) to compare two concatenations of length O(m + n)
