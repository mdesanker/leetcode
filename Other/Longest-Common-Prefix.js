/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let prev = strs[0];
  for (let i = 1; i < strs.length; i++) {
    const curr = strs[i];
    const minLen = Math.min(prev.length, curr.length);

    let prefix = "";
    for (let j = 0; j < minLen; j++) {
      if (prev[j] === curr[j]) prefix += prev[j];
      else break;
    }
    prev = prefix;
  }
  return prev;
};
// Time: O(n * m) where m is average length of word
// Space: O(m)
