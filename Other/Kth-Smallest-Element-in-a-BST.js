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
 * @param {number} k
 * @return {number}
 */

const kthSmallest = function (root, k) {
  const visited = [];

  function dfs(node) {
    if (node) {
      dfs(node.left);
      visited.push(node.val);
      dfs(node.right);
    }
  }

  dfs(root);
  return visited[k - 1];
};

/*
Time: O(N)
Space: O(1)
*/
