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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  let res = root.val,
    dist = Math.abs(root.val - target);

  function dfs(node) {
    if (!node) return null;

    dfs(node.left);
    if (Math.abs(node.val - target) < dist) {
      res = node.val;
      dist = Math.abs(node.val - target);
    }
    dfs(node.right);
  }
  dfs(root);
  return res;
};

// Time: O(n) traverse every node to check distance from target
// Space: O(n) recursive stack is height of tree, O(logn) for balanced, O(n) for skewed
