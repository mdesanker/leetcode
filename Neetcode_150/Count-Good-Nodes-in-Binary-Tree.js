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
var goodNodes = function (root) {
  function dfs(node, maxVal) {
    let res = 0;
    // base case return 0
    if (!node) return res;

    // good node if node.val >= maximum val in path so far
    if (node.val >= maxVal) res++;

    // calculate new maxVal
    maxVal = Math.max(maxVal, node.val);

    // perform recursion on children and add to res
    res += dfs(node.left, maxVal);
    res += dfs(node.right, maxVal);

    return res;
  }

  // pass root.val as initial maxVal
  return dfs(root, root.val);
};

// Time: O(n)
// Space: O(h) where h is height of the tree
