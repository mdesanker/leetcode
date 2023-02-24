/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  const n = s.length;

  // union-find to connect all swappable characters
  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      par[p] = par[par[p]];
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

  for (let [n1, n2] of pairs) {
    union(n1, n2);
  }

  // map root node to connected characters - O(n)
  const map = new Map();
  for (let i = 0; i < par.length; i++) {
    // O(n)
    const root = find(i);
    if (!map.has(root)) map.set(root, []);
    map.get(root).push(s[i]);
  }

  // sort characters - O(n^2 * logn)
  for (let [_, val] of map) val.sort(); // O(n^2 * logn)

  // build result string - O(n^2)
  let res = "";
  for (let i = 0; i < s.length; i++) {
    // O(n)
    const root = find(i);
    const chars = map.get(root);
    res += chars.shift(); //O(n)
  }

  return res;
};

// Time: O(n^2 * logn)
// Space: O(n)

/**
1. Union-find to create connected components of swappable characters(nodes)
2. Map root nodes to all possible characters
3. Sort characters within mappings
4. Build result string
 */
