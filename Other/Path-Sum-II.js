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
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const res = [];

  function dfs(node, currSum, path) {
    if (!node) return null;

    // if at leaf node, check total and push to results
    if (!node.left && !node.right) {
      if (currSum + node.val === targetSum) {
        res.push([...path, node.val]);
        return;
      }
    }

    dfs(node.left, currSum + node.val, [...path, node.val]);
    dfs(node.right, currSum + node.val, [...path, node.val]);
  }
  dfs(root, 0, []);
  return res;
};

// Time: O(n)
// Space: O(n)

/**
Traverse tree to find root to leaf path where path sum === targetSum and push the path to a result array

Helper function will need node, currSum, and path parameters so that we aren't traversing path each step to calculate currSum

Base case
If reach null node, return null

If reach a leaf node (no left or right child) check if the currSum + current node value = targetSum
If currSum = targetSum, the push the complete path to res array

If not at a leaf node, traverse left and right subtrees, incrementing currSum with current node val and extending path to include curr node val

Call helper function on root, with empty array for path, and currSum = 0

TC: O(n) we will traverse every node to find all possible root-leaf paths
SC: O(n) we additional space to build the path array, and for the recursive stack. Both will be the height of the tree, so for skewed tree O(n), 
and for a balanced tree O(logn)
 */
