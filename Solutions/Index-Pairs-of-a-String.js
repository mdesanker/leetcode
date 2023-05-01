/**
 * @param {string} text
 * @param {string[]} words
 * @return {number[][]}
 */
var indexPairs = function (text, words) {
  const res = [];
  for (let i = 0; i < text.length; i++) {
    for (let word of words) {
      if (word[0] === text[i] && text.slice(i, i + word.length) === word) {
        res.push([i, i + word.length - 1]);
      }
    }
  }
  return res.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
};
// TC: O(nm^2) nm for iterate through every word at every index of text, additional * m for slice to check match
// SC: O(logn) for built in sort
