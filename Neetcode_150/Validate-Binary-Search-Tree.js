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
var isValidBST = function (root) {
  function dfs(node, left, right) {
    // base case
    if (!node) return true;

    // node val must be smaller than upper bound and greater than lower bound
    if (!(node.val < right && node.val > left)) return false;

    // run on child nodes, modifying left and right limits as needed
    return dfs(node.left, left, node.val) && dfs(node.right, node.val, right);
  }
  // run on root with initially unbounded limits
  return dfs(root, -Infinity, Infinity);
};

// Time: O(n) since visit each node once
// Space: O(n) since keep up to the entire tree
