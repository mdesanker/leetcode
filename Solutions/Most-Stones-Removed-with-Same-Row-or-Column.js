/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const n = stones.length;

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

  // number of stones removed === number of unions made
  let count = 0;

  // iterate through every combination of stones
  // this problem feels a little uncomfortable because every stone has a pair of coordinates, but we treat it as a single index when we do UF
  // we check if a stone's x and y coords match another stone's, and if they do, we union them if not already connected
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // if the stones share same row or col, try to union and increase count (number of stones removed)
      if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
        count += union(i, j);
      }
    }
  }
  return count;
};

// Time: O(v^2) nested for-loops to compare every possible combination of stones
// Space: O(v) parent and rank arrays contain every node
