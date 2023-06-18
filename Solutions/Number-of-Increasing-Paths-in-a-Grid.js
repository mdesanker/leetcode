/**
 * @param {number[][]} grid
 * @return {number}
 */
var countPaths = function (grid) {
  const n = grid.length,
    m = grid[0].length;
  const MOD = 10 ** 9 + 7;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const dp = [...new Array(n)].map(() => new Array(m).fill(0));

  let paths = 0;

  function dfs(r, c, prev) {
    if (r < 0 || r >= n || c < 0 || c >= m) return 0;
    if (grid[r][c] <= prev) return 0;

    if (dp[r][c]) return dp[r][c];

    const left = dfs(r, c - 1, grid[r][c]);
    const right = dfs(r, c + 1, grid[r][c]);
    const up = dfs(r - 1, c, grid[r][c]);
    const down = dfs(r + 1, c, grid[r][c]);

    return (dp[r][c] = (1 + left + right + up + down) % MOD);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      paths += dfs(i, j, -1) % MOD;
    }
  }
  return paths % MOD;
};
// TC: O(nm)
// SC: O(nm)
