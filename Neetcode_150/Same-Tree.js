/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true; // both nodes are null
  if (!p || !q) return false; // only one node is null
  if (p.val !== q.val) return false; // values aren't equal

  // perform check on left and right children and return answer
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// Time: O(n) where N is number of nodes in tree
// Space: O(n)
