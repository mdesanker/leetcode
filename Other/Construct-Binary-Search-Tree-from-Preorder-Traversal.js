/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  if (!preorder.length) return null;

  // root is first node in preorder traversal
  const root = new TreeNode(preorder[0]);
  // mid point is the last node that is still smaller than the root
  let mid = 0;
  for (let i = 1; i < preorder.length; i++) {
    if (preorder[i] < preorder[0]) mid = i;
  }

  // build left and right subtrees
  root.left = bstFromPreorder(preorder.slice(1, mid + 1));
  root.right = bstFromPreorder(preorder.slice(mid + 1));

  return root;
};

// Time: O(n)
// Space: O(n)
