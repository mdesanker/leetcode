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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  // base case
  if (!root) return null;

  // swap left and right nodes
  let tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  // invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// Time: O(n)
// Space: O(n)

/**
Preorder traversal of binary tree, swapping left and right nodes recursively
Then call invertTree function on the left and right subtrees
Return the root of the tree

TC: O(n) each node in the tree is visited only once
SC: O(n) recursive stack can be equal to height of tree. In a skewed tree, this will be equal to number of nodes, in a balanced tree will be O(logn)
 */
