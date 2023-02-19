/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  // we have 26 nodes in the graph, because the nodes are lower case letters and there are 26 letters in the alphabet
  const par = [];
  for (let i = 0; i < 26; i++) par.push(i);
  const rank = new Array(26).fill(1);

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
    if (p1 === p2) return false;

    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return true;
  }

  // "==" equations represent all the connections in the graph
  // "!=" equations represent all the pairs of nodes that should not be connected
  // First pass: all "==" equations to build all connections
  // Second pass: all "!=" equations to check for contraditions

  // First pass:
  for (let equation of equations) {
    if (equation[1] === "=") {
      const n1 = equation[0].charCodeAt() - "a".charCodeAt();
      const n2 = equation[3].charCodeAt() - "a".charCodeAt();
      union(n1, n2);
    }
  }

  // Second pass:
  for (let equation of equations) {
    if (equation[1] === "!") {
      const n1 = equation[0].charCodeAt() - "a".charCodeAt();
      const n2 = equation[3].charCodeAt() - "a".charCodeAt();
      // equation says these nodes should not be connected
      // if they have the same parent, then they are connected, return false
      if (find(n1) === find(n2)) return false;
    }
  }
  return true;
};

// Time: O(v)
//      O(1) for union find operations, amortized
//      O(v) for first pass of all equality operations
//      O(v) for second pass of all inequality operations
// Space: O(v) ~ O(1) for parent and rank array (capped at 26)
