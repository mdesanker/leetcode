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
var diameterOfBinaryTree = function (root) {
  let max = 0;

  function dfs(root) {
    // base case
    if (!root) return 0;

    // find height of left and right subtree
    let left = dfs(root.left);
    let right = dfs(root.right);

    // check diameter of current node using left and right height
    max = Math.max(max, left + right);

    // return height running through root node
    return 1 + Math.max(left, right);
  }

  dfs(root);
  return max;
};

// Time: O(n)
// Space: O(n)

/**
Easiest to implement with a global variable that can track max diameters as we traverse tree

Create a helper function to traverse the tree
We will be calculating the maxDepth of left and right subtrees for each node
The diameter at each node is equal to the sum of the depths of its left and right subtrees
At every node, we compare the current diameter against the max diameter stored in the global variable
Return the height of the current subtree from the helper function

TC: O(n) traverse every node once
SC: O(n) recursive stack can be equal to height of tree. In a skewed tree, this will be equal to number of nodes, in a balanced tree will be O(logn)
 */
