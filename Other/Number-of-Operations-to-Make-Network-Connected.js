/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  // minimum number of connections to connect all points is number of connections needed to make a tree
  // tree has no cycles, so will be the minimum
  // edges === nodes - 1 for a tree
  // if not enough connections to build a valid tree, immediately return -1
  if (n - 1 > connections.length) return -1;

  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return 0;

    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return 1;
  }

  // start with n separate computers
  let count = n;

  // everytime we connect two computers, we decrease number of separate computers by 1
  for (let [n1, n2] of connections) {
    count -= union(n1, n2);
  }
  // subtract 1 from count to get the min number of connections that must be made to connect all computers (when count === 1)
  return count - 1;
};

// Time: O(v + e)
//    O(v) to initialize parent and rank arrays
//    O(e) to iterate through all the edges
// Space: O(v) the parent and rank arrays contain every vertex
