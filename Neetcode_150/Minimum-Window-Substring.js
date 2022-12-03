/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const neededChars = {};

  // map t to neededChars
  for (let char of t) {
    neededChars[char] = (neededChars[char] || 0) + 1;
  }

  // sliding window on s
  let left = 0;
  let right = 0;
  let neededLength = Object.keys(neededChars).length;
  let substring = "";

  while (right < s.length) {
    const rightChar = s[right];
    neededChars[rightChar]--;
    if (neededChars[rightChar] === 0) neededLength--;

    // once have a substring that contains all needed chars, start incrementing left pointer
    while (neededLength === 0) {
      // if no saved substring or existing substring is longer than current window
      if (!substring || substring.length > right - left + 1) {
        substring = s.slice(left, right + 1);
      }

      // increment left pointer
      const leftChar = s[left];
      // If the leftChar in charMap is at exactly 0 before being
      // incremented, we now need more leftChars so that its count
      // in charMap goes down to exactly 0
      if (neededChars[leftChar] === 0) {
        neededLength++;
      }
      neededChars[leftChar]++;
      left++;
    }

    right++;
  }

  return substring;
};

// Time: O(N + M)
// Space: O(N + M)
