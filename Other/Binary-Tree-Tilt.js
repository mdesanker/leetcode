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
var findTilt = function (root) {
  let res = 0;

  function valueSum(node) {
    if (!node) return 0;

    // get sum of left and right subtrees
    let left = valueSum(node.left);
    let right = valueSum(node.right);
    // tilt is difference between left and right
    let count = Math.abs(left - right);
    // add tilt to result
    res += count;

    // return sum of nodes in subtree
    return left + right + node.val;
  }
  valueSum(root);
  return res;
};

// Time: O(n)
// Space: O(n)
