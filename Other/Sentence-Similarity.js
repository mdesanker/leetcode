/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (s1, s2, similarPairs) {
  // build hash with similar words
  const pairMap = {};
  for (let [x, y] of similarPairs) {
    // add both directions since can't search value: key pairs
    if (!pairMap[x]) pairMap[x] = new Set();
    if (!pairMap[y]) pairMap[y] = new Set();
    pairMap[x].add(y);
    pairMap[y].add(x);
  }

  if (s1.length !== s2.length) return false;

  for (let i = 0; i < s1.length; i++) {
    // check if each word is the same
    if (s1[i] === s2[i]) continue;
    // chceck if each word is similar
    else if (pairMap[s1[i]] && pairMap[s1[i]].has(s2[i])) continue;
    // if not, return false
    else return false;
  }
  return true;
};

// Time: O((n + k) * m) See: https://leetcode.com/problems/sentence-similarity/solutions/2961463/sentence-similarity/
// Space: O(k * m) store k words of length m
