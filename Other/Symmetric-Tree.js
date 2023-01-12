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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;

  // helper function to check if child nodes are mirrors
  function isMirror(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    // same logic as 'Same Tree' but check mirror children positions
    return isMirror(p.left, q.right) && isMirror(p.right, q.left);
  }

  return isMirror(root.left, root.right);
};

// Time: O(n)
// Space: O(n)
