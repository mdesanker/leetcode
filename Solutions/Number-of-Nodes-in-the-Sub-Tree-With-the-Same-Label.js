/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
var countSubTrees = function (n, edges, labels) {
  // build adjacency list
  const adj = {};
  for (i = 0; i < n; i++) adj[i] = [];
  for (let [par, child] of edges) {
    adj[par].push(child);
    adj[child].push(par);
  }
  const res = new Array(n).fill(1);

  function dfs(prev, curr) {
    const ans = new Array(26).fill(0);

    for (let child of adj[curr]) {
      if (prev !== child) {
        // array returned by child node
        const res = dfs(curr, child);
        // combine frequencies of right and left subtrees into one array
        for (let i = 0; i < 26; i++) {
          ans[i] += res[i];
        }
      }
    }
    // increment the freq of curr node label and store in result array
    res[curr] = ++ans[labels.charCodeAt(curr) - "a".charCodeAt(0)];
    return ans;
  }

  dfs(-1, 0);

  return res;
};

// Time: O(n)
// Space: O(n)
