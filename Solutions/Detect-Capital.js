/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  let n = word.length;

  // if only one char, return true
  if (n === 1) return true;

  // if first and second chars are upper case, entire word must be uppercase
  if (word[0] === word[0].toUpperCase() && word[1] === word[1].toUpperCase()) {
    for (let i = 2; i < n; i++) {
      if (word[i] !== word[i].toUpperCase()) return false;
    }
    // else everything except first char must be lower case
  } else {
    for (let i = 1; i < n; i++) {
      if (word[i] !== word[i].toLowerCase()) return false;
    }
  }
  return true;
};

// Time: O(n)
// Space: O(1)

var detectCapitalUse = function (word) {
  if (word === word.toUpperCase()) return true;
  if (word === word.toLowerCase()) return true;
  if (
    word.slice(0, 1) === word.slice(0, 1).toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase()
  )
    return true;

  return false;
};
