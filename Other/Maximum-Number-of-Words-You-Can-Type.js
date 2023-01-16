/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
var canBeTypedWords = function (text, brokenLetters) {
  // create a set with broken letters
  const broken = new Set();
  for (let char of brokenLetters) broken.add(char);

  // split text into words
  const words = text.split(" ");

  let res = words.length;

  // for every word, iterate through every char and check if in broken set
  for (const word of words) {
    for (const char of word) {
      // if char is broken, decrement counter and stop iterating for this word
      if (broken.has(char)) {
        res--;
        break;
      }
    }
  }
  return res;
};

// Time: O(n * m) where n is number of words, and m is length of words
// Space: O(n)
