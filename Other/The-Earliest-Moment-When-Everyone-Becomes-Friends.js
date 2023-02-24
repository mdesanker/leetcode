/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
var earliestAcq = function (logs, n) {
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

  let count = n;

  // sort logs in increasing order of time so we make earliest connections first
  logs.sort((a, b) => a[0] - b[0]);

  for (let [time, n1, n2] of logs) {
    if (union(n1, n2)) {
      count--;
      // once fully connected, return time
      if (count === 1) return time;
    }
  }
  // components not fully connected
  return -1;
};

// Time: o(n * aN) ~ O(n)
// Space: O(n)
