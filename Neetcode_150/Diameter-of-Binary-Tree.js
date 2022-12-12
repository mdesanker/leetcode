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
var diameterOfBinaryTree = function (root) {
  let max = 0;

  function dfs(root) {
    // base case
    if (!root) return -1;

    // find height of left and right subtree
    let left = dfs(root.left);
    let right = dfs(root.right);

    // check diameter of current node using left and right height
    max = Math.max(max, left + right);

    // return heigh running through root node
    return 1 + Math.max(left, right);
  }

  dfs(root);
  return max;
};

// Time: O(N)
// Space: O(N)
