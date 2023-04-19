/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestZigZag = function (root) {
  let max = 0;

  function dfs(node, len, goLeft) {
    if (!node) return null;

    max = Math.max(max, len);

    if (goLeft) {
      // continue counter to left, reset to right
      dfs(node.left, len + 1, false);
      dfs(node.right, 1, true);
    } else {
      // continue counter to right, reset to left
      dfs(node.right, len + 1, true);
      dfs(node.left, 1, false);
    }
  }
  dfs(root, 0, true);
  dfs(root, 0, false);
  return max;
};
// TC: O(n)
// SC: O(n)
