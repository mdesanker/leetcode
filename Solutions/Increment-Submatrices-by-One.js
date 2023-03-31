/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(0));
  }

  for (let coord of queries) {
    let topLeft = [coord[0], coord[1]];
    let bottomRight = [coord[2], coord[3]];

    for (let r = topLeft[0]; r <= bottomRight[0]; r++) {
      for (let c = topLeft[1]; c <= bottomRight[1]; c++) {
        matrix[r][c] += 1;
      }
    }
  }

  return matrix;
};

// Time: O(m * n ^ 2)
// Space: O(n ^ 2)
