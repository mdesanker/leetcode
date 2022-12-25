/**
 * @param {number[][]} edges
 * @return {number[]}
 */

// Union find by rank

var findRedundantConnection = function (edges) {
  // intially every node's parent is itself
  const par = [];
  for (let i = 0; i < edges.length + 1; i++) {
    parent.push(i);
  }

  // initially every nodes rank is 1
  const rank = new Array(edges.length + 1).fill(1);

  function find(n) {
    // find parent by checking corresponding index of parent array
    let p = par[n];

    // while parent !== itslef, keep iterating through parent
    while (p != par[p]) {
      // par[p] = par[par[p]]; // optional to expedite rate
      p = par[p];
    }
    // return parent
    return p;
  }

  // return false if already merged (can't complete)
  function union(n1, n2) {
    // find parents of each node
    let p1 = find(n1),
      p2 = find(n2);

    // if they already share a parent, they are merged
    if (p1 === p2) return false;

    // make bigger graph the parent
    if (rank[p1] > rank[p2]) {
      par[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      par[p1] = p2;
      rank[p2] += rank[p1];
    }
    return true;
  }

  for (const [n1, n2] of edges) {
    // if can't union the two nodes, return nodes as answer
    if (!union(n1, n2)) {
      return [n1, n2];
    }
  }
};

// Time: O(n) where n is number of edges
// Space: O(n) for par array and recursion stack
