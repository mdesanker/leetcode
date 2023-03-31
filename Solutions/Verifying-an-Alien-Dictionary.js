/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  // map each letter in the alien dictionary to it's index in the alphabet
  const charMap = {};
  for (let i = 0; i < order.length; i++) charMap[order[i]] = i;

  // start at second word and compare against previous word
  for (let i = 1; i < words.length; i++) {
    let prevWord = words[i - 1];
    let currWord = words[i];

    // compare all the first characters in both words until we encounter a different char
    for (let j = 0; j < prevWord.length; j++) {
      // if the current chars are the same, then skip
      if (prevWord[j] === currWord[j]) continue;
      // if char of prev word comes before char of current word in dict
      // if prev word doesn't have a char (is shorter than current word)
      // then these two words are in valid order, break out of loop
      else if (charMap[prevWord[j]] < charMap[currWord[j]] || !prevWord[j])
        break;
      // char of prev word comes after char of current word
      // immediately return false
      else return false;
    }
  }
  // make it to end of words, return true
  return true;
};

// TC: O(nk) n is length of words, and k is max length of word
// SC: O(1)
