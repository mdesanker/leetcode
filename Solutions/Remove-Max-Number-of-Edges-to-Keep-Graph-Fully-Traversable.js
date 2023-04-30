/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
class UnionFind {
  constructor(n) {
    this.par = [];
    for (let i = 0; i < n; i++) this.par.push(i);
    this.rank = new Array(n).fill(1);
    this.components = n;
  }

  find(n) {
    if (n === this.par[n]) return n;
    return (this.par[n] = this.find(this.par[n]));
  }

  union(n1, n2) {
    let p1 = this.find(n1),
      p2 = this.find(n2);
    if (p1 === p2) return 0;
    if (this.rank[p1] > this.rank[p2]) {
      this.par[p2] = p1;
      this.rank[p1] += this.rank[p2];
    } else {
      this.par[p1] = p2;
      this.rank[p2] += this.rank[p1];
    }
    this.components--;
    return 1;
  }
}
var maxNumEdgesToRemove = function (n, edges) {
  const Alice = new UnionFind(n);
  const Bob = new UnionFind(n);
  const Both = new UnionFind(n);

  let remove = 0;
  // process shared edges first
  for (let [type, a, b] of edges) {
    if (type === 3) {
      Both.union(a, b) ? (Alice.union(a, b), Bob.union(a, b)) : remove++;
    }
  }
  for (let [type, a, b] of edges) {
    if (type === 1) {
      !Alice.union(a, b) && remove++;
    } else if (type === 2) {
      !Bob.union(a, b) && remove++;
    }
  }
  if (Alice.components > 1 || Bob.components > 1) return -1;
  return remove;
};
// m = edges.length
// TC: O(m)
// SC: O(n)
