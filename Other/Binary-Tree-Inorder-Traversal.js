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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];

  function traverse(node) {
    if (!node) return null;

    if (node.left) traverse(node.left);
    res.push(node.val);
    if (node.right) traverse(node.right);
  }
  traverse(root);
  return res;
};

// Time: O(n)
// Space: O(n)
