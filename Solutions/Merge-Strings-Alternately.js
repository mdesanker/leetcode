/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  let p1 = (p2 = 0);
  let res = "";
  while (p1 < n && p2 < m) {
    res += word1[p1] + word2[p2];
    p1++;
    p2++;
  }

  if (p1 < n) res += word1.substring(p1);
  else if (p2 < m) res += word2.substring(p2);
  return res;
};
// TC: O(n)
// SC: O(1) not including res string
