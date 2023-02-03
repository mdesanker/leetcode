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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const res = [];

  function dfs(node) {
    // short circuit after reaching kth number
    if (res.length !== k) {
      // base case
      if (!node) return null;

      // in-order traversal
      dfs(node.left);
      res.push(node.val);
      dfs(node.right);
    }
  }

  dfs(root);
  // return 1-indexed kth smallest element in array
  return res[k - 1];
};

// Time: O(n) pass at most every node once
// Space: O(n) result array contains every node

/**
Inorder traversal of BST and store result in an array will list the nodes in increasing order.
Then we can return the value at index k - 1 (because tree is 1-indexed)

TC: O(n) traverse every node once until we reach kth element, could traverse all nodes in tree if k is length of tree - 1
SC: O(n) space to build array with inorder traversal of BST
 */
