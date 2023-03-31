/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// No built-in methods
var strStr = function (haystack, needle) {
  const n = needle.length;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) {
          break;
        }
        if (j === needle.length - 1) return i;
      }
    }
  }
  return -1;
};

// Time: O(n * m)
// Space: O(1)

// No indexOf
var strStr = function (haystack, needle) {
  const n = needle.length;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0] && haystack.slice(i, i + n) === needle) {
      return i;
    }
  }
  return -1;
};

// indexOf
var strStr = function (haystack, needle) {
  if (needle.length > haystack.length) return -1;
  return haystack.indexOf(needle);
};
