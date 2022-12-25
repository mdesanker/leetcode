/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  // create parent array
  const par = [];
  for (let i = 0; i < n; i++) {
    par.push(i);
  }

  // create rank array
  const rank = new Array(n).fill(1);

  // track number of connected components
  let res = n;

  // find function
  function find(n) {
    let p = par[n];
    while (p != par[p]) {
      par[p] = par[par[p]]; // path shortening standard for find function
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    // find parents of both nodes
    let p1 = find(n1),
      p2 = find(n2);

    // if already connected, return 0
    if (p1 === p2) return 0;

    // connect nodes based on rank
    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      p2.rank += p1.rank;
    } else {
      par[p2] = p1;
      p1.rank += p2.rank;
    }
    // return 1 for successful union
    return 1;
  }

  // decrement result for every successful union
  for (const [n1, n2] of edges) {
    res -= union(n1, n2);
  }
  return res;
};

// Time: O(v + e)
// Space: O(v)  to store the parent of each vertex
