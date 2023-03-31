/**
 * @param {string} s
 * @return {number}
 */

const lengthOfLongestSubstring = function (s) {
  let start = 0,
    length = 0,
    charMap = {};

  // extend sliding window
  for (let end = 0; end < s.length; end++) {
    let rightChar = s[end];

    // if rightChar in map, jump window forward
    if (rightChar in charMap) {
      start = Math.max(start, charMap[rightChar] + 1);
    }

    // add rightChar to map
    charMap[rightChar] = end;

    // store max length
    length = Math.max(length, end - start + 1);
  }
  return length;
};

/*
Time: O(n)
Space: O(n)
*/

/**
Use a hash map to track visited chars and their last index of occurence.
Iterate through string with r pointer.

Check if the current right char is already in charMap, this means this char is 
part of the current substring. To remove it from the substring, we need to advance 
the left pointer to the max of itself and index of duplicate + 1.

Then update the index of the right char (or add to hashmap if not already there)

At end of each loop, check the current length of the substring and compare against max

TC: O(n) iterate through string once
SC: O(min(n, m)) if every character in the string is unique, then the hashmap will have to hold
every character in the string (n), but is capped at the size of the alphabet (m)
 */
