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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  function dfs(node, target) {
    // if node undefined, return false
    if (!node) return false;

    // if leaf node, return whether target is met
    if (!node.left && !node.right) {
      return target - node.val === 0;
    }

    // run on child nodes
    return (
      dfs(node.left, target - node.val) || dfs(node.right, target - node.val)
    );
  }

  return dfs(root, targetSum);
};

// Time: O(n) n is number of nodes
// Space: O(h) h is height of tree
