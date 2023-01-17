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
// DFS pre-order traversal
var sumNumbers = function (root) {
  let res = 0;

  function dfs(node, currNum) {
    if (!node) return 0;

    const curr = currNum * 10 + node.val;

    if (!node.left && !node.right) {
      res += curr;
      return;
    }

    dfs(node.left, curr);
    dfs(node.right, curr);
  }

  dfs(root, "");
  return res;
};

// Time: O(n)
// Space: O(h)
