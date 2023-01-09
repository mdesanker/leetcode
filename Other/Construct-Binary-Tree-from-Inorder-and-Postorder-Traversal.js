/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;

  const last = postorder.pop();
  const root = new TreeNode(last);
  const mid = inorder.indexOf(last);

  // postorder = [...leftNodes, ...rightNodes, root]
  // while popping from postorder, must build right side of tree first
  root.right = buildTree(inorder.slice(mid + 1), postorder);
  root.left = buildTree(inorder.slice(0, mid), postorder);

  return root;
};

// Time: O(n)
// Space: O(n)