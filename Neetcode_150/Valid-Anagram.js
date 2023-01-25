/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isAnagram = function (s, t) {
  // initialize hashmap to store char freq
  const freqMap = {};

  // iterate through first string adding chars and incrementing freq
  for (let char of s) freqMap[char] = freqMap[char] + 1 || 1;

  // iterate through second string
  for (let char of t) {
    // if char not in map, then it doesn't exist in first string, not an anagram so return false immediately
    if (!freqMap[char]) return false;
    else {
      // decrement freq for match
      freqMap[char]--;
      // if freq of char = 0, remove from hashmap
      if (freqMap[char] === 0) delete freqMap[char];
    }
  }

  // return whether length of keys or values of hashmap = 0 because every char has been matched and removed
  return Object.keys(freqMap).length === 0;
};

/*
Time: O(n)
Space: O(n)
*/

/**
 * O(n) time complexity solution
 * Iterate through the first string, storing every character and its frequency in a hash map.
 * Iterate through the second string,if the character does not exist in the hashmap, immediately return false, they are not anagrams
 * Decrement the frequency of the char in the hashmap to account for the match. If the frequency of the char in hashmap is now 0,
 * then remove char from hashmap. Return whether the length of keys or values in the hashmap is 0.
 * Length will be 0 if every char has been matched and removed.
 *
 * TC: O(n) iterate through first string once, and then second string once. O(n + n) simplifies to O(2n) simplifies to O(n) because constants are ignored
 * SC: O(n) hashmap will hold every char in strings 1
 */
