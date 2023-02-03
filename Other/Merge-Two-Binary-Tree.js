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
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root1 && !root2) return null;

  if (!root1) return root2;
  if (!root2) return root1;

  // merge both roots into root1
  root1.val = root1.val + root2.val;

  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
};

// Time: O(m) where m is minimum number of nodes from the two given trees
// Space: O(m)

/**
Merge both trees into tree1

Base cases
If both nodes are null, return null
If one root is null, return the other root

If neither root is null:
Set root1.val to the sum of both roots
Set root1.left to merge of left subtrees
Set root1.right to merge of right subtrees

Return root1

TC: O(m) where m is the minimum number of nodes from the two subtrees. Once one tree is null, the other tree values just get tacked on
SC: O(m) recursive stack will be the height of the smaller tree, for skewed tree this will be O(m), for balanced tree this will be O(logm)
 */
