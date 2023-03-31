/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  const res = [];

  for (let r = 0; r < numRows; r++) {
    let level = new Array(r + 1).fill(1);
    for (let c = 0; c < level.length; c++) {
      if (r === 0 && c === 0) level[c] = 1;
      else {
        let left = (right = 0);
        if (c > 0) left = res[res.length - 1][c - 1];
        if (c < r) right = res[res.length - 1][c];
        level[c] = left + right;
      }
    }
    res.push(level);
  }
  return res;
};

// Time: O(r^2)
// Space: O(r^2) - O(1) if you don't consider the result array
