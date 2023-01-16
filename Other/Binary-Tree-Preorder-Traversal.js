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
// Recursive
var inorderTraversal = function (root) {
  const res = [];

  function traverse(node) {
    if (!node) return null;

    res.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  traverse(root);
  return res;
};

// Time: O(n)
// Space: O(n)

// Iterative
var preorderTraversal = function (root) {
  const res = [];
  const stack = [root];

  while (stack.length) {
    let currNode = stack.pop();
    if (currNode) {
      res.push(currNode.val);
      stack.push(currNode.right);
      stack.push(currNode.left);
    }
  }
  return res;
};
