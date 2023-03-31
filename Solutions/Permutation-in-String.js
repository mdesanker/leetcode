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

/** 
Edge case: if s1 is longer than s2, then s2 cannot possibly contain a permutation of s1

Map characters of s1 into a hashmap

Initialize l and r pointers at beginning of s2, and neededLength counter which is initialized to the length of s1.

While r is less than s2
If value for rightChar in hashmap is greater than 0, then it is a needed char, so neededLength is decreased by 1
Decrement value of rightChar in hashmap (if doesn't exist, nothing will happen)
r pointer needs to be incremented here (if it is incremented at end of while loop, then it extends the window length by 1)

If neededLength is 0, then immediately return true because have a valid permutation.

If length of window is greater than s1, then window needs to be shrunk by moving l pointer
If leftChar value in hashmap is greater than or equal to 0, it is a necessary char, so neededLength must be incremented 
so we know this char will have to be replaced in the window before an answer can be found
Increment count of leftChar in hashmap (if doesn't exist, nothing will happen)
Increment l pointer

If r makes to end of s2 (while loop terminates) then return false because no permutation was found in s2

TC: O(n + m) iterate through s1 and s2 once each
SC: O(n) if every char in s1 is unique, then the size of hashmap will equal length of s1. 
This is capped at n = 26 due to size of alphabet, so technically O(1) memory is required
*/
