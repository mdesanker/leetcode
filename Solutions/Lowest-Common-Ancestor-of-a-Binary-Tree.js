/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // return node if node is one of taget nodes
  if (!root || root === p || root === q) return root;

  // check left and right trees for target nodes
  const resLeft = lowestCommonAncestor(root.left, p, q);
  const resRight = lowestCommonAncestor(root.right, p, q);

  // if there is a node in each subtree, then root is the LCA, otherwise both nodes in one subtree
  return resLeft && resRight ? root : resLeft || resRight;
};

// Time: O(n)
// Space: O(n)
