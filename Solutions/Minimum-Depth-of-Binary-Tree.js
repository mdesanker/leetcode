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
var minDepth = function (root) {
  // no root then height is 0
  if (!root) return 0;
  // no children then height is 1
  if (!root.left && !root.right) return 1;

  // if only 1 child, check height of that child's subtree
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

// Time: O(n)
// Space: O(n)

/**
To find distance from root to nearest leaf node recursively

Base cases:
If current node is null return 0 (no height)
If current node has no children (leaf node) return 1 because it's height is itself

If we make it through the base cases, then we know we aren't at a leaf node
If there is only one child, we need to return 1 + the height of its subtree

If there are two children, then we will need to return 1 + the minimum heights of the two subtrees

TC: O(n) traverse each node once
SC: recursive stack can be equal to height of tree. In a skewed tree, this will be equal to number of nodes, in a balanced tree will be O(logn)
 */
