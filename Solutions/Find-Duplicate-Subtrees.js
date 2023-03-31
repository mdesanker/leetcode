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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const res = [];
  const map = new Map();

  function dfs(node) {
    if (!node) return null;

    const subtree = `${node.val}#${dfs(node.left)}#${dfs(node.right)}`;

    map.set(subtree, map.get(subtree) + 1 || 1);
    if (map.get(subtree) === 2) res.push(node);
    return subtree;
  }

  dfs(root);
  return res;
};

// Time: O(n)
// Space: O(n)
