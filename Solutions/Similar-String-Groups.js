/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
  const n = strs.length,
    m = strs[0].length;
  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    if (n === par[n]) return n;
    return (par[n] = find(par[n]));
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return 0;
    if (rank[p1] > rank[p2]) {
      par[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      par[p1] = p2;
      rank[p2] += rank[p1];
    }
    return 1;
  }

  function isGroup(s1, s2) {
    let count = 0;
    for (let i = 0; i < m; i++) {
      if (s1[i] !== s2[i]) count++;
      if (count > 2) return false;
    }
    return true;
  }

  let groups = n;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isGroup(strs[i], strs[j])) {
        groups -= union(i, j);
      }
    }
  }
  return groups;
};
// TC: O(mn^2)
// SC: O(n)
