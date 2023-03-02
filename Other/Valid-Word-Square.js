/**
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
  const n = Math.max(...words.map((word) => word.length));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < words.length; j++) {
      if ((words[i] && !words[j]) || (!words[i] && words[j])) return false;
      if (words[i][j] !== words[j][i]) return false;
    }
  }
  return true;
};

// Time: O(n * m) n is length of words array and m is maximum length of string
// Space: O(1)
