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
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let res = Infinity,
    prev = Infinity;

  function traverse(node) {
    if (!node) return null;

    // in order traversal to iterate over numbers in increasing order
    traverse(node.left);
    // compare difference of current node.val to prev
    res = Math.min(res, Math.abs(prev - node.val));
    // update previous to current node
    prev = node.val;
    traverse(node.right);
  }
  traverse(root);
  return res;
};

// Time: O(n)
// Space: O(n)
