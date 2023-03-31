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
    res += Math.abs(left - right);

    // return sum of nodes in subtree
    return left + right + node.val;
  }
  valueSum(root);
  return res;
};

// Time: O(n)
// Space: O(n)

/**
We need a helper function to where we return the sum of all nodes in the current subtree
The tilt is the absolute difference between the sum of the left subtree and the right subtree

Use global variable to track the total

Helper function:
Base case
If node is null return 0

Call helper function on left and right subtrees, store in variables left and right, so that can be used to calcualte tilt
Calculate tilt by taking absolute value of difference between left and right

Return sum of nodes in subtree

return node.val + left + right;

Call helper function on root and return the final value of the counter

TC: O(n) traverse every node once
SC: O(n) recursive stack is equal to height of the tree, in a skewed tree with this will n, in a balanced tree this will be logn
 */
