/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
  const indegrees = new Array(n).fill(0);
  for (let [_, b] of edges) {
    indegrees[b]++;
  }

  const res = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) {
      res.push(i);
    }
  }

  return res;
};
// TC: O(v + e)
// SC: O(v)
