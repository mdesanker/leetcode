/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
var numIslands2 = function (m, n, positions) {
  const par = new Array(m * n).fill(-1);
  const rank = new Array(m * n).fill(1);

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

  const res = [];
  // track the count of islands after every coordinate
  let count = 0;

  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // iterate through every pair of coords in positions
  for (let [r, c] of positions) {
    // map 2D coordinates into linear index for par array
    const i = r * n + c;

    // if point already has a valid parent, then it is land
    // we will not modify it and count will not change
    if (par[i] !== -1) {
      res.push(count);
      continue;
    }

    // if we make it here, point is water, so we can turn it into land by setting it's parent to itself
    // add new coordinate to graph and increment land count
    par[i] = i;
    count++;

    // iterate over all neighbors of position
    for (let [dr, dc] of dir) {
      let row = r + dr,
        col = c + dc;
      const i2 = row * n + col;

      // if out of bounds continue
      if (row < 0 || row >= m || col < 0 || col >= n) continue;
      // if neighbor is water continue
      if (par[i2] === -1) continue;

      // we union the two neighbors and decrease count because we have connected two nodes
      if (union(i, i2)) count--;
    }
    // push count for this position onto res array
    res.push(count);
  }
  return res;
};

// Time: O(row * col + l) where l is size of positions array
// Space: O(row * col) par and rank arrays require m * n space

// // Implement DSU class with find and union functions
// class DSU {
//   constructor(n) {
//     this.par = new Array(n).fill(-1);
//     this.rank = new Array(n).fill(1);
//   }

//   find(n) {
//     let p = this.par[n];
//     while (p !== this.par[p]) {
//       p = this.par[p];
//     }
//     return p;
//   }

//   union(n1, n2) {
//     let p1 = this.find(n1),
//       p2 = this.find(n2);
//     if (p1 === p2) return false;

//     if (this.rank[p1] < this.rank[p2]) {
//       this.par[p1] = p2;
//       this.rank[p2] += this.rank[p1];
//     } else {
//       this.par[p2] = p1;
//       this.rank[p1] += this.rank[p2];
//     }
//     return true;
//   }
// }

// var numIslands2 = function (m, n, positions) {
//   const res = [];
//   const dsu = new DSU(m * n);
//   let count = 0;

//   const dir = [
//     [1, 0],
//     [-1, 0],
//     [0, 1],
//     [0, -1],
//   ];

//   for (let [r, c] of positions) {
//     // convert 2D into linear coordinate
//     const i = r * n + c;

//     if (dsu.par[i] !== -1) {
//       res.push(count);
//       continue;
//     }

//     dsu.par[i] = i;
//     count++;

//     for (let [dr, dc] of dir) {
//       let row = r + dr,
//         col = c + dc;
//       const i2 = row * n + col;

//       if (row < 0 || row >= m || col < 0 || col >= n) continue;
//       if (dsu.par[i2] === -1) continue;

//       if (dsu.union(i, i2)) count--;
//     }
//     res.push(count);
//   }
//   return res;
// };
