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
var isCompleteTree = function (root) {
  if (!root) return true;

  const q = [root];
  let prev = root;

  while (q.length) {
    const node = q.shift();
    if (node) {
      // null node in the middle means not complete binary tree
      if (!prev) return false;

      q.push(node.left);
      q.push(node.right);
    }
    prev = node;
  }
  return true;
};

// Time: O(n)
// Space: O(n)
