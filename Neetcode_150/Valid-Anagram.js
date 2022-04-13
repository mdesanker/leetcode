/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const validAnagram = function (s, t) {
  const charMap = {};

  for (let char of s) {
    charMap[char] ? charMap[char]++ : (charMap[char] = 1);
  }

  for (let char of t) {
    if (charMap[char]) {
      charMap[char]--;
      if (charMap[char] === 0) {
        delete charMap[char];
      }
    } else return false;
  }

  return Object.keys(charMap).length === 0;
};

/*
Time: O(N)
Space: O(N)
*/
