/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

const checkInclusion = function (s1, s2) {
  // if s1 is longer than s2, s2 cannot contain a permutations
  if (s1.length > s2.length) return false;

  // create hashmap with chars of s1
  const neededChar = {};
  for (let i = 0; i < s1.length; i++) {
    neededChar[s1[i]] ? neededChar[s1[i]]++ : (neededChar[s1[i]] = 1);
  }

  // sliding window pattern
  let left = 0,
    right = 0,
    requiredLength = s1.length;

  while (right < s2.length) {
    const rightChar = s2[right];

    // if we find a neededChar, reduce required length by 1
    if (neededChar[rightChar] > 0) requiredLength--;
    // reduce count of new char in neededChar
    neededChar[rightChar]--;
    right++;

    // if we found all the neededChars
    if (requiredLength === 0) return true;

    // if window length === s1.length, have to remove left element of window (new element on right added in next iteration)
    if (right - left === s1.length) {
      const leftChar = s2[left];

      // if left element was neededChar, increase requiredLength because that element no longer part of window
      if (neededChar[leftChar] >= 0) requiredLength++;
      // increase count of left element removed from window
      neededChar[leftChar]++;
      left++;
    }
  }
  return false;
};

/*
Time: O(N + M) - N = s1.length, M = s2.length
Space: O(1)
*/
