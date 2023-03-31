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

/**
We will need a helper function that takes two separate nodes in order to determine whether tree is symmetric
This helper function will be very similar to the sameTree question (leetcode easy)
However, instead of comparing p.left with q.left and p.right with q.right, we will compare p.left with q.right and p.right with q.left

Edge case is if root is null, then return true (technically a symmetric tree)
Return helper function called on root.left and root.right

TC: O(n) we will traverse every node once
SC: O(n) recursive stack equal to height of tree in worst case scenario
 */
