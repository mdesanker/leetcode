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
var searchBST = function (root, val) {
  if (!root) return null;

  if (root.val === val) return root;

  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
};

// Time: O(logn)
// Space: O(h) where h is height of BST (n in worse case scenario)

// var searchBST = function (root, val) {
//   if (!root) return null;

//   if (val < root.val) return searchBST(root.left, val);
//   else if (val > root.val) return searchBST(root.right, val);
//   else return root;
// };

/**
Search BST until we find the value we are looking for, return null if we can't find it

Base case 
If root is null, reached the end of the traversal and cannot find the val, return null
If root.val is the value we are looking for, return the root

We haven't reached the end of the tree and haven't found the node we are looking for, search left or right depending on how root.val compares to val
If val is less than current root val, search root.left, else search root.right

TC: O(n) n is tree height for a skewed tree (worst case) and O(logn) in average case (balanced binary tree)
SC: O(n) for the recursive stack which is height of tree for skewed tree, O(logn) for balanced binary tree
 */
