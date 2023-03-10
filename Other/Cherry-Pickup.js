/**
 * @param {number[][]} grid
 * @return {number}
 */
// Recursion
var cherryPickup = function (grid) {
  const N = grid.length;

  function dp(r1, c1, r2, c2) {
    // after t steps, each position we could be, is on line r + c = t
    // therefore r1 + c1 = r2 + c2 -> r2 = r1 + c1 - c2
    let r2 = r1 + c1 - c2;

    // out of bounds base case
    // return -Inf instead of 0, so that paths that go out of bounds or hit barriers are not considered valid
    if (r1 >= N || c1 >= N || r2 >= N || c2 >= N) return -Infinity;
    if (grid[r1][c1] === -1 || grid[r2][c2] === -1) return -Infinity;
    // destination base case
    if (r1 === N - 1 && c1 === N - 1) {
      return grid[r1][c1];
    }

    // recurrence relation
    // get the counts of cherries at both positions
    let val = grid[r1][c1];
    if (c1 !== c2) val += grid[r2][c2];

    // four possible combinations of two moves for each path
    // return the max path
    val += Math.max(
      dp(r1, c1 + 1, r2, c2 + 1),
      dp(r1, c1 + 1, r2 + 1, c2),
      dp(r1 + 1, c1, r2, c2 + 1),
      dp(r1 + 1, c1, r2 + 1, c2)
    );
    return val;
  }
  //paths that high barriers will be -Inf, so return max of res and 0
  return Math.max(0, dp(0, 0, 0, 0));
};

// Time: O(2^n * 2^n) two possible paths at each step
// Space: O(n) path length is 2n which simplifies to n

// Recursion + Memoization
var cherryPickup = function (grid) {
  const N = grid.length;
  const memo = {};

  function dp(r1, c1, r2, c2) {
    // after t steps, each position we could be, is on line r + c = t
    // therefore r1 + c1 = r2 + c2 -> r2 = r1 + c1 - c2
    let r2 = r1 + c1 - c2;

    // check cache
    const key = `${r1}#${c1}#${r2}#${c2}`;
    if (key in memo) return memo[key];

    // out of bounds base case
    // return -Inf instead of 0, so that paths that go out of bounds or hit barriers are not considered valid
    if (r1 >= N || c1 >= N || r2 >= N || c2 >= N) return -Infinity;
    if (grid[r1][c1] === -1 || grid[r2][c2] === -1) return -Infinity;
    // destination base case
    if (r1 === N - 1 && c1 === N - 1) {
      return grid[r1][c1];
    }

    // recurrence relation
    // get the counts of cherries at both positions
    let val = grid[r1][c1];
    if (c1 !== c2) val += grid[r2][c2];

    // four possible combinations of two moves for each path
    // return the max path
    val += Math.max(
      dp(r1, c1 + 1, r2, c2 + 1),
      dp(r1, c1 + 1, r2 + 1, c2),
      dp(r1 + 1, c1, r2, c2 + 1),
      dp(r1 + 1, c1, r2 + 1, c2)
    );
    return (memo[key] = val);
  }
  //paths that high barriers will be -Inf, so return max of res and 0
  return Math.max(0, dp(0, 0, 0, 0));
};

// Time: O(2^n * 2^n) two possible paths at each step
// Space: O(n) path length is 2n which simplifies to n
