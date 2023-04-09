/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
// Kahn's
var largestPathValue = function (colors, edges) {
  const n = colors.length;
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  const indegrees = new Array(n).fill(0);
  for (let [a, b] of edges) {
    adj[a].push(b);
    indegrees[b]++;
  }

  const count = [...new Array(n)].map(() => new Array(26).fill(0));
  const q = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) {
      q.push(i);
    }
  }

  let res = 0,
    seen = 0;
  while (q.length) {
    const node = q.shift();
    res = Math.max(
      res,
      ++count[node][colors[node].charCodeAt() - "a".charCodeAt()]
    );
    seen++;

    for (let nei of adj[node]) {
      for (let i = 0; i < 26; i++) {
        count[nei][i] = Math.max(count[nei][i], count[node][i]);
      }
      indegrees[nei]--;
      if (indegrees[nei] === 0) {
        q.push(nei);
      }
    }
  }
  return seen < n ? -1 : res;
};
// TC: O(m + n)
// SC: O(m + n)
