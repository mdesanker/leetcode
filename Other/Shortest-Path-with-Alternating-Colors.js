/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const adj = {};
  for (let i = 0; i < n; i++) adj[i] = [];
  for (let [n1, n2] of redEdges) {
    adj[n1].push([n2, 0]);
  }
  for (let [n1, n2] of blueEdges) {
    adj[n1].push([n2, 1]);
  }

  const res = new Array(n).fill(-1);
  const visited = [];
  for (let i = 0; i < n; i++) visited.push(new Array(2).fill(false));
  const q = [];

  // start with node 0, with number of steps as 0, and undefined color -1
  q.push([0, 0, -1]);
  visited[0][0] = true;
  visited[0][1] = true;
  res[0] = 0;

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [node, steps, prevColor] = q.shift();

      for (let [nei, color] of adj[node]) {
        if (!visited[nei][color] && color !== prevColor) {
          visited[nei][color] = true;
          q.push([nei, 1 + steps, color]);
          if (res[nei] === -1) res[nei] = 1 + steps;
        }
      }
    }
  }
  return res;
};

// Time: O(v + e)
// Space: O(v + e)
