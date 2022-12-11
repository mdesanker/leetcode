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

// Time: O(H) where H is height of tree
// Space: O(N)
