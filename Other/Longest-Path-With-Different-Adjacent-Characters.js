/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function (parent, s) {
  // build adjacency list
  const adj = {};
  for (let i = 0; i < parent.length; i++) adj[i] = [];
  // start at 1 to skip origin with -1 value
  for (let i = 1; i < parent.length; i++) {
    if (parent[i] === -1) continue;
    adj[parent[i]].push(i);
  }

  // initialize to 1 because single node can be longest chain
  let res = 1;

  function dfs(node) {
    // track length of longest and second longest paths
    let longestChain = 0,
      secondLongestChain = 0;

    for (let child of adj[node]) {
      const childLength = dfs(child);

      // characters match
      if (s[child] === s[node]) continue;

      // compare and update two longest chain lengths
      if (childLength > longestChain) {
        secondLongestChain = longestChain;
        longestChain = childLength;
      } else if (childLength > secondLongestChain) {
        secondLongestChain = childLength;
      }
    }

    // check longest chain
    res = Math.max(res, 1 + longestChain + secondLongestChain);

    // return longest path up the tree
    return 1 + longestChain;
  }
  dfs(0);
  return res;
};

// Time: O(n)
// Space: O(n)
