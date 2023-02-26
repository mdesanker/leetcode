/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
/**
base case: word1 = "" or word2 = "" => return length of other string
recursive case: word1[0] == word2[0] => recurse on word1[1:] and word2[1:]
recursive case: word1[0] != word2[0] => recurse by inserting, deleting, or replacing
 */

// Recursion with Memoization
var minDistance = function (word1, word2, i = 0, j = 0, memo = new Map()) {
  if (i === word1.length && j === word2.length) return 0;
  else if (i === word1.length) return word2.length - j;
  else if (j === word2.length) return word1.length - i;

  const key = `${i}#${j}`;

  if (!memo.has(key)) {
    if (word1[i] === word2[j]) {
      const res = minDistance(word1, word2, i + 1, j + 1, memo);
      memo.set(key, res);
    } else {
      const insert = 1 + minDistance(word1, word2, i, j + 1, memo);
      const del = 1 + minDistance(word1, word2, i + 1, j, memo);
      const replace = 1 + minDistance(word1, word2, i + 1, j + 1, memo);
      const res = Math.min(insert, del, replace);
      memo.set(key, res);
    }
  }
  return memo.get(key);
};

// Recursive (TLE)
var minDistance = function (word1, word2) {
  if (!word1.length) {
    return word2.length;
  } else if (!word2.length) {
    return word1.length;
  } else if (word1[0] === word2[0]) {
    return minDistance(word1.slice(1), word2.slice(1));
  }
  const insert = 1 + minDistance(word1, word2.slice(1));
  const del = 1 + minDistance(word1.slice(1), word2);
  const replace = 1 + minDistance(word1.slice(1), word2.slice(1));
  return Math.min(insert, del, replace);
};
