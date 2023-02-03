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
var goodNodes = function (root) {
  function dfs(node, maxVal) {
    let res = 0;
    // base case return 0
    if (!node) return res;

    // good node if node.val >= maximum val in path so far
    if (node.val >= maxVal) res++;

    // calculate new maxVal
    maxVal = Math.max(maxVal, node.val);

    // perform recursion on children and add to res
    res += dfs(node.left, maxVal);
    res += dfs(node.right, maxVal);

    return res;
  }

  // pass root.val as initial maxVal
  return dfs(root, root.val);
};

// Time: O(n)
// Space: O(h) where h is height of the tree

/**
We will use DFS.
We are interested in the greatest value that has been traversed so far, so will need to pass this as a parameter with the node in every function call

Base case
If current node does not exist, return 0

Initialize a counter at 0, to count the number of good nodes in this subtree
If the current node's value is greater than the maxVal which was passed as a parameter, then it is good node
Increment counter by 1

Then need to check if the maxVal needs to be updated before it is passed to child nodes
The result from the child nodes will be added to the counter for this level

We return the count for this subtree so it can be used in the counter for parent nodes

Call function with root and root value as initial maxVal

TC: O(n) every node is traversed once
SC: O(n) recursive stack will be the height of the tree in the worst case, and for a skewed tree this will be equal to the number of nodes
 */
