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

/**
This problem is a good candidate for union find because we are given an array of connections between nodes.
The number of components will initially be the number of nodes, because we will start with every node un-connected
We can build the graph using this the array of edges and everytime we successfully union two node, we will decrement the number of components

Standard union-find by rank approach (outlined in more detail in "Redundant Connection" notes)

Union function is modified:
Return 0 if p1 === p2. If the nodes share a parent, they are already connected, so we will not change the number of independent components by building this connection (they are already connected)
Return 1 if we connect two points that were previously unconnected

We will iterate through every edge in edges array, and subtract the result of calling union on the pair of nodes from the number of nodes (initial number of independent components)

TC: O(e) we iterate over every edge in the graph
SC: O(v) space needed for parent and rank arrays which have an index for every vertex
 */
