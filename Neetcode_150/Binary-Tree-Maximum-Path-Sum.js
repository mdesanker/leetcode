/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// https://leetcode.com/problems/binary-tree-maximum-path-sum/solutions/982696/javascript-o-n-time-easy-to-understand-with-explanation/?orderBy=most_votes&languageTags=javascript

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let max = -Infinity;

  function findSums(node) {
    // base case - hit a null
    if (!node) return 0;

    let left = findSums(node.left),
      right = findSums(node.right),
      totalSum = left + right + node.val,
      leftSum = node.val + left,
      rightSum = node.val + right;

    // max is all possible combinations
    max = Math.max(max, node.val, totalSum, leftSum, rightSum);

    // return max path, either node.val, left + node.val, or right + node.val
    return Math.max(leftSum, rightSum, node.val);
  }

  findSums(root);

  return max;
};

// Time: O(N)
// Space: O(1)
