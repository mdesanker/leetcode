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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
  if (!root) return null;

  // root val is too low, keep only the right subtree
  if (root.val < low) {
    return trimBST(root.right, low, high);
    // root val is too large, keep only the left subtree
  } else if (root.val > high) {
    return trimBST(root.left, low, high);
    // root val is in range, keep both left and right subtree, return node itself
  } else {
    // might need to update left and right subtrees
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
  }
};

// Time: O(n)
// Space: O(n)

/**
Base case
If root is null, return null

We will traverse every node and check whether it is in range
If the node is below the low range, we return right child because it has a chance of being above low barrier
If the node is above the high range, we return left child because it has a chance of being below high barrier
If this node is in range, then we will trim its left and right subtrees and return the root

TC: O(n) worst case we must traverse the entire tree to check that every node is in range
SC: O(n) the recursive stack will be the height of the tree, O(n) for a skewed tree, and O(logn) for a balanced tree
 */
