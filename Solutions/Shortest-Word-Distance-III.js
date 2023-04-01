/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// Brute force
var shortestWordDistance = function (wordsDict, word1, word2) {
  const n = wordsDict.length;
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    const first = wordsDict[i];
    if (first !== word1) continue;
    for (let j = 0; j < n; j++) {
      const second = wordsDict[j];
      if (i === j || second !== word2) continue;
      min = Math.min(min, Math.abs(i - j));
    }
  }
  return min;
};
// Time: O(n^2)
// Space: O(1)

// Two pointer
var shortestWordDistance = function (wordsDict, word1, word2) {
  const n = wordsDict.length;
  let dist = Infinity,
    prevIndex = -1;
  for (let i = 0; i < n; i++) {
    if (wordsDict[i] === word1 || wordsDict[i] === word2) {
      // If prevIndex is present and pointing to a different string than the string at the current index
      // Or if both word1 and word2 are the same.
      if (
        prevIndex !== -1 &&
        (wordsDict[prevIndex] !== wordsDict[i] || word1 === word2)
      ) {
        dist = Math.min(dist, i - prevIndex);
      }
      // Update the prevIndex to point it to the current index.
      prevIndex = i;
    }
  }
  return dist;
};
// Time: O(n)
// Space: O(1)
