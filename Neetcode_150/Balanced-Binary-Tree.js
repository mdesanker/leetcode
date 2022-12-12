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
var isBalanced = function (root) {
  function dfs(node) {
    // if node is null, return that node is balanced and height = 0
    if (!node) return [true, 0];

    let left = dfs(node.left);
    let right = dfs(node.right);

    // can only be balanced if left and right are balanced
    let balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

    // return whether node is balanced and height of subtree
    return [balanced, 1 + Math.max(left[1], right[1])];
  }

  // return the boolean
  return dfs(root)[0];
};

// Time: O(n)
// Space: O(n)
