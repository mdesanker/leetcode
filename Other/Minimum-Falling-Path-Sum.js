/**
 * @param {number[][]} matrix
 * @return {number}
 */

// https://leetcode.com/problems/minimum-falling-path-sum/solutions/1724482/optimise-optimise-optimise/?orderBy=most_votes&languageTags=javascript

const minFallingPathSum = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] =
        matrix[i][j] +
        Math.min(
          matrix[i - 1][j],
          matrix[i - 1][j - 1] || 10000,
          matrix[i - 1][j + 1] || 10000
        );
    }
  }
  return Math.min(...matrix[m - 1]);
};

// Time: O(n * m)
// Space: O(1)
