/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const neededChars = {};
  for (let char of t) neededChars[char] = neededChars[char] + 1 || 1;

  let l = 0,
    r = 0,
    needed = t.length,
    substring = "";

  while (r < s.length) {
    const rightChar = s[r];
    if (neededChars[rightChar] > 0) needed--;
    neededChars[rightChar]--;

    while (needed === 0) {
      if (!substring || substring.length > r - l + 1) {
        substring = s.slice(l, r + 1);
      }

      const leftChar = s[l];
      if (neededChars[leftChar] >= 0) needed++;
      neededChars[leftChar]++;
      l++;
    }
    r++;
  }
  return substring;
};

// Time: O(N + M)
// Space: O(N + M) ??

/** 
Edge case: if t is longer than s, then return empty string because will not be able to find substring of s that contains every char of t.

Use a hashmap to track the needed chars in t and check whether current substring of s contains all chars.

Initialize two pointer to beginning of s, variable to track number of needed chars, and an empty string for the answer.
While r pointer is less than length of s, if rightChar is in needed hashmap, decrement number of needed chars and decrement count of char in hashmap.

While needed === 0, check if we have new shorter substring and then increment l pointer and see if still valid window
First update substring answer if it is either empty or current window is smaller than current substring - slice from l to r + 1.
Then increment left pointer and see if still valid

Increment r pointer before loop ends

TC: O(s + t) iterate through t once to build hashmap, then iterate through s once to find substring
SC: O(t) memory to hold every char in t in hashmap (upper limit 26 keys so technically O(1) space)
*/

var minWindow2 = function (s, t) {
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
    // neededLength only reaches 0 when all the characters in hashmap are at 0, we ensure we have enough repeat characters in the substring
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
