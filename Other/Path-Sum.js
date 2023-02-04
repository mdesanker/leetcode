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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  function dfs(node, currSum) {
    // if node undefined, return false
    if (!node) return false;

    // if leaf node, return whether target is met
    if (!node.left && !node.right) {
      return currSum + node.val === targetSum;
    }

    // run on child nodes
    return (
      dfs(node.left, currSum + node.val) || dfs(node.right, currSum + node.val)
    );
  }

  return dfs(root, 0);
};

// Time: O(n) n is number of nodes
// Space: O(n)

/**
Want to find if there is a root to leaf path sum that equals targetSum

Helper function will need to track node and current sum

Base case
If we get to a null node and haven't reached targetSum, return false

If we are at a leaf node, no left or right child, return whether whether currSum = targetSum

If we aren't at a leaf noce, traverse left and right subtrees, adding current node val to currSum

Call helper on root node with currSUm = 0

TC: O(n) we will traverse every node once until we find a path sum that equals targetSum
SC: O(n) recursive stack will be equal to the height of the tree, for a skewed tree this will be O(n), for a balanced tree this will be O(logn)
 */
