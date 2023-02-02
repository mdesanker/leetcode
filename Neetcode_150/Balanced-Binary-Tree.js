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
 * @return {boolean}
 */
var isBalanced = function (root) {
  function dfs(node) {
    // if node is null, return that node is balanced and height = 0
    if (!node) return [true, 0];

    let left = dfs(node.left);
    let right = dfs(node.right);

    // can only be balanced if left and right are balanced
    let balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

    // return whether node is balanced and height of subtree
    return [balanced, 1 + Math.max(left[1], right[1])];
  }

  // return the boolean
  return dfs(root)[0];
};

// Time: O(n)
// Space: O(n)

/**
We need to keep track of both the height of the subtree and whether the current subtree is balanced, so we will return an array of these two values
from the helper function

Base case:
If the current node is null, then we have a balanced subtree and its height is 0

if (!node) return [true, 0]; // [isBalanced, height]

We will traverse the left and right subtrees to get their heights
Then we need to calculate whether the current subtree is balanced

A subtree is balanced if its left and right subtrees are balanced, and the difference in heights of its subtrees is <= 1

const isBalanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

Return [isBalanced, 1 + Math.max(left[1], right[1])]; // [isBalanced, height]

TC: O(n) traverse every node once
SC: O(n) recursive stack is equal to the height of the tree in worst case scenario. For a skewed tree, this will be equal to the number of nodes
 */
