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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const res = [];

  function dfs(node, total, path) {
    if (!node) return null;

    // if at leaf node, check total and push to results
    if (!node.left && !node.right) {
      if (total + node.val === targetSum) {
        res.push([...path, node.val]);
        return;
      }
    }

    dfs(node.left, total + node.val, [...path, node.val]);
    dfs(node.right, total + node.val, [...path, node.val]);
  }
  dfs(root, 0, []);
  return res;
};

// Time: O(n)
// Space: O(n)
