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

    let left = dfs(root.left);
    let right = dfs(root.right);

    // if path doesn't go through root, get the largest of the two
    max = Math.max(max, left + right);

    // path goes through root so add 1 for root
    return 1 + Math.max(left, right);
  }

  dfs(root);
  return max;
};

// Time: O(N)
// Space: O(N)
