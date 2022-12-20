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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  // if root is null, return new tree node in this spot
  if (!root) return new TreeNode(val);

  // if val smaller than root.val, insert into left subtree
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
    // otherwise insert into right subtree
  } else if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};

// Time: O(logn)
// Space: O(n)
