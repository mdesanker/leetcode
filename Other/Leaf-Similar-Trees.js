/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  function dfs(node, leaves) {
    if (!node) return null;

    // if node is a leaf, push value to result array
    if (!node.left && !node.right) {
      leaves.push(node.val);
    }

    // run dfs on branches
    dfs(node.left, leaves);
    dfs(node.right, leaves);
  }

  const leaves1 = [];
  const leaves2 = [];

  dfs(root1, leaves1);
  dfs(root2, leaves2);

  return (
    leaves1.length === leaves2.length &&
    leaves1.every((val, i) => (val = leaves2[i]))
  );
};

// Time: O(T1 + T2) where T1 and T2 are the lengths of the given trees
// Space: O(T1 + T2)
