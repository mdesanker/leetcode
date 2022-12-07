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
 * @return {number}
 */
const rangeSumBST = (root, L, R) => {
  let sum = 0;
  const traverse = (root) => {
    // if root val is within acceptable range
    if (root.val >= L && root.val <= R) sum += root.val;
    // if root val > L, root.left could still be within range --> traverse root.left
    if (root.left && root.val > L) traverse(root.left);
    // if root val < R, root.right could still be within range --> traverse root.right
    if (root.right && root.val < R) traverse(root.right);
  };
  traverse(root);
  return sum;
};

// Time: O(N) where N is number of nodes in tree
// Space: O(N)
