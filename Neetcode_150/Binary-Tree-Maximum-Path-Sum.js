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
  let res = -Infinity;

  function pathSum(node) {
    // Base case
    if (!node) return 0;

    // determine contribution from left and right subtree
    // if negative, we do not include
    let leftSum = Math.max(pathSum(node.left), 0);
    let rightSum = Math.max(pathSum(node.right), 0);

    // compare against res
    // if left or tight path sum is negative, they are counted as 0
    res = Math.max(res, leftSum + rightSum + node.val);

    // return max sum for a path starting at this root
    return Math.max(node.val + leftSum, node.val + rightSum);
  }

  pathSum(root);
  return res;
};

// Time: O(n)
// Space: O(n)

/**
Traverse tree and calculate maximum path sum in any which way

Helper function will return the max path for a particular node
Base case
If node is null return 0, it has no value to contribute to path

There are four possibilities
1. path starts at the root and goes down through the root's left child
2. path starts at the root and goes down through the root's right child
3. path includes both the left and right child
4. path does not include any child, only the root itself

A path is guaranteed to contain the root. A path will only go down through the left/right child if we see a gain in the path sum
First we must determine the gain in path sum contributed by left and right subtree, then we decide whether to include their contribution
This means we need post-order traversal

Call function recursively on the left and right children of root and store in variable
If left or right sum is negative, set to 0, we will not include its contribution if nothing to gain

Update max path sum

Return the path sum gain contributed by the subtree - the maximum of root.val + left or right subtree

TC: O(n) each node in tree is traversed once because all possibilities must be considered
SC: O(n) recursive will be depth of the tree, O(n) for skewed tree, and O(logn) for balanced tree
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
