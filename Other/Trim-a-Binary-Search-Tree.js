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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
  if (!root) return null;

  // root val is too low, keep only the right subtree
  if (root.val < low) {
    return trimBST(root.right, low, high);
    // root val is too large, keep only the left subtree
  } else if (root.val > high) {
    return trimBST(root.left, low, high);
    // root val is in range, keep both left and right subtree, return node itself
  } else {
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
  }
};

// Time: O(n)
// Space: O(h)
