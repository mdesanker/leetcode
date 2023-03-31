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
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  // root is first element in preorder traversal
  const root = new TreeNode(preorder[0]);
  // root is mid point of inorder traversal
  const mid = inorder.indexOf(preorder[0]);

  // build left and right subtrees with relevant portions of pre and inorder traversals
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

  return root;
};

// Time: O(n)
// Space: O(n)

/**
We will break the preorder and inorder arrays apart repeatedly to help build the left and right subtrees of the tree

Base case
If there is nothing left in the preorder or inorder arrays, then we have finished building the tree and return null

Preorder traversal goes to the parent node , then the left node, and then the right nodes
Inorder traversal goes to the left node, then parent, then right node

The first element in the preorder traversal is the value for the current/root node
Build a new TreeNode with preorder[0] as the value

Finding the index of the root node value in the inorder traversal will split the inorder traveral into left and right sides for the tree
Store this index in a variable

Build the left and right subtrees, recursively calling the buildTree function with the relevant portions of the preorder and inorder traverals sliced out

Return the root/current node

TC: O(n) we will traverse every node once as we build the tree
SC: O(n) for the slices of the preorder and inorder traversals
 */
