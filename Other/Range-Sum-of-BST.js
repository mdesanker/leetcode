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
  const traverse = (node) => {
    if (!node) return null;

    // if root val is within acceptable range
    if (node.val >= L && node.val <= R) sum += node.val;
    // if root val > L, root.left could still be within range --> traverse root.left
    if (node.val > L) traverse(node.left);
    // if root val < R, root.right could still be within range --> traverse root.right
    if (node.val < R) traverse(node.right);
  };
  traverse(root);
  return sum;
};

// Time: O(n) where N is number of nodes in tree
// Space: O(n)

/**
Use helper function to traverse the tree and if the node val falls within the range, add it to the result counter
Optimization: Since this is a BST, we do not need to traverse a tree if we know that it is guaranteed to be out of range, based off current node val
Only check left subtree if current node.val > lower limit
Only check right subtree if current node.val < upper limit

TC: O(n) worst case scenario, every node is in range, we traverse every node once
SC: O(n) recursive stack equal to height of tree, for a skewed tree this will be O(n), for balanced tree O(logn)
 */
