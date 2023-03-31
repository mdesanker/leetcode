/**
Solution: DP - Recursion w/ Memoization & Prefix Sum

Populate appleCount using prefix sum, where appleCount[i][j] = the number of apples in the piece with top left corner (i, j) and bottom right corner (n - 1, m - 1).
The formula appleCount[i][j] = appleCount[i][j + 1] + appleCount[i + 1][j] - appleCount[i + 1][j + 1] + curr means:
  - count = right count + bottom count - bottom right count.
  - we add the right count and bottom count because we want to take the full sum.
  - we subtract the bottom right count because in the right count and bottom count, the bottom right count is added on twice.

- Memoize each dp(i, j, k), where dp(i, j, k) = the number of ways to cut piece with top left corner (i, j) and bottom right corner (n - 1, m - 1) with k cuts left.

i = the row number
j = the column number
k = the amount of cuts we have left

For each dp(i, j, k), count the number of ways after cutting at each row and column.
- Make sure the piece we are cutting contains at least one apple.
  - We can check this by checking whether the appleCount[newRow][newColumn] > appleCount[row][column].
  - If appleCount[newRow][newColumn] is equal to appleCount[row][column], we know the piece we are taking has no apples.

m = number of rows, n = number of columns
Time Complexity: O(mnk * (m + n)) 146ms
Space Complexity: O(mnk) 44.5MB
 */
var ways = function (pizza, k) {
  const n = pizza.length,
    m = pizza[0].length,
    mod = 10 ** 9 + 7;
  const appleCount = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      let curr = pizza[i][j] === "A" ? 1 : 0;
      appleCount[i][j] =
        appleCount[i][j + 1] +
        appleCount[i + 1][j] -
        appleCount[i + 1][j + 1] +
        curr;
    }
  }

  const memo = [...new Array(n)].map(() =>
    [...new Array(m)].map(() => new Array(k + 1).fill(-1))
  );

  function dp(i, j, k) {
    if (k === 1) return appleCount[i][j] > 0 ? 1 : 0;
    if (appleCount[i][j] === 0) return 0;
    if (memo[i][j][k] !== -1) return memo[i][j][k];

    let res = 0;
    for (let newRow = i; newRow < n - 1; newRow++) {
      if (appleCount[newRow + 1][j] === appleCount[i][j]) continue; // top piece has no apples
      res = (res + dp(newRow + 1, j, k - 1)) % mod;
    }
    for (let newCol = j; newCol < m - 1; newCol++) {
      if (appleCount[i][newCol + 1] === appleCount[i][j]) continue; // left piece has no apples
      res = (res + dp(i, newCol + 1, k - 1)) % mod;
    }
    return (memo[i][j][k] = res);
  }
  return dp(0, 0, k);
};
// Time: O(mnk * (m + n))
// Space: O(mnk)
