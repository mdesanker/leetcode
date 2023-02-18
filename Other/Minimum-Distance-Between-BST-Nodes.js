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
var minDiffInBST = function (root) {
  let prev = Infinity;
  let res = Infinity;

  function dfs(node) {
    if (!node) return null;

    dfs(node.left);
    res = Math.min(res, Math.abs(node.val - prev));
    prev = node.val;
    dfs(node.right);
  }
  dfs(root);
  return res;
};

// Time: O(n) we iterate over every node once
// Space: O(n) space will be the size of the recursive stack, which will be the height of the tree.
//  O(logn) for balanced binary tree, and O(n) for a skewed tree
