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

// Iterative
var inOrderTraversalIter = function (root) {
  const res = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    // find smallest leaf in current subtree while pushing nodes to stack
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // pop leaf node from stack and push value onto res array
    current = stack.pop();
    res.push(current.val);
    // move current to right child
    current = current.right;
  }
  return res;
};

// Time: O(n)
// Space: O(n)
