/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
// Inorder traversal
var inorderSuccessor = function (root, p) {
  const inorder = [];
  function dfs(node) {
    if (!node) return null;

    dfs(node.left);
    inorder.push(node);
    dfs(node.right);
  }
  dfs(root);

  const n = inorder.length;
  for (let i = 0; i < n; i++) {
    if (inorder[i].val === p.val && i < n - 1) return inorder[i + 1];
  }
  return null;
};
// TC: O(n)
// SC: O(n)

/**
Solution: Modified Binary Search

If root is greater than p, then it is a potential solution. Check left subtree to see if we find better solution
If root is smaller than p, then we need to find a larger value so check right subtree
*/
var inorderSuccessor = function (root, p) {
  let res = null;
  while (root) {
    if (root.val > p.val) {
      res = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }
  return res;
};
// TC: O(logn)
// SC: O(1)
