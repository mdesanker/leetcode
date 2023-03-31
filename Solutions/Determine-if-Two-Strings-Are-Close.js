/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;

  const word1Map = {};
  const word2Map = {};

  for (let char of word1) {
    word1Map[char] ? word1Map[char]++ : (word1Map[char] = 1);
  }

  for (let char of word2) {
    word2Map[char] ? word2Map[char]++ : (word2Map[char] = 1);
  }

  const word1Keys = Object.keys(word1Map).sort();
  const word2Keys = Object.keys(word2Map).sort();

  const word1Vals = Object.values(word1Map).sort();
  const word2Vals = Object.values(word2Map).sort();

  if (
    JSON.stringify(word1Keys) === JSON.stringify(word2Keys) &&
    JSON.stringify(word1Vals) === JSON.stringify(word2Vals)
  )
    return true;

  return false;
};

// Time: O(N * logN)
// Space: O(N + M) where N and M are lengths of word1 and word2
