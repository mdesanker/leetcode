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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  // if root is null, return new tree node in this spot
  if (!root) return new TreeNode(val);

  // if val smaller than root.val, insert into left subtree
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
    // otherwise insert into right subtree
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};

// Time: O(logn)
// Space: O(n)

/**
We will insert the node as a child on a leaf node
We must traverse the BST to find a suitable leaf node to insert the node

Base case
Once we reach a null node, we know we have just come from a leaf node, so we can insert the new node
Return the new TreeNode with the val specified in parameters

If root is not null, we insert to the left or right subtree depending on how root.val compares to val
If val < root.val, we need to insert into left subtree
Else we insert into right subtree

Return the root of the tree

TC: O(n) we must traverse to a leaf node, so n will be the tree height. This will be O(n) for a skewed tree, and O(logn) in balanced tree
SC: O(n) recursive stack is the height of the tree, O(n) for skewed tree, O(logn) for balanced tree
 */
