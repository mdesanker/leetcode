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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  // isSameTree question
  function sameTree(s, t) {
    if (!s && !t) return true;
    if (!s || !t) return false;
    if (s.val !== t.val) return false;

    return sameTree(s.left, t.left) && sameTree(s.right, t.right);
  }

  if (!subRoot) return true; // subtree is empty
  if (!root) return false; // tree is empty, subtree is not empty

  if (sameTree(root, subRoot)) return true; // same tree

  // is subRoot a subtree of either left or right child
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

// Time: O(mn) where n and m are number of nodes in root and subroot
// Space: O(n + m)
