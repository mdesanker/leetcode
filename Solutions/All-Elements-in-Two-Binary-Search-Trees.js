/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
// Recursive In-Order Traversal and Sorting
var getAllElements = function (root1, root2) {
  const res = [];

  function traverse(node) {
    if (!node) return null;

    traverse(node.left);
    res.push(node.val);
    traverse(node.right);
  }

  traverse(root1);
  traverse(root2);

  return res.sort((a, b) => a - b);
};

// Time: O((m + n)log(m + n))
// Space: O(m + n)
