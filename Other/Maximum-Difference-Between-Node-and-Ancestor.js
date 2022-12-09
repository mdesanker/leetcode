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
var maxAncestorDiff = function (root) {
  if (!root) return 0;

  let res = 0;

  function helper(node, curMax, curMin) {
    if (!node) return;

    res = Math.max(
      res,
      Math.abs(curMax - node.val),
      Math.abs(curMin - node.val)
    );

    // update max and min
    curMax = Math.max(curMax, node.val);
    curMin = Math.min(curMin, node.val);

    helper(node.left, curMax, curMin);
    helper(node.right, curMax, curMin);
  }

  helper(root, root.val, root.val);
  return res;
};

// Time: O(N) where N is number of nodes in tree - visit every node once
// Space: O(N) since we need stacks to do recursion
