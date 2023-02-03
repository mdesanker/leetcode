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
var getMinimumDifference = function (root) {
  let res = Infinity,
    prev = Infinity;

  function traverse(node) {
    if (!node) return null;

    // in order traversal to iterate over numbers in increasing order
    traverse(node.left);
    // compare difference of current node.val to prev
    res = Math.min(res, Math.abs(prev - node.val));
    // update previous to current node
    prev = node.val;
    traverse(node.right);
  }
  traverse(root);
  return res;
};

// Time: O(n)
// Space: O(n)

/**
Minimum absolute difference between any two different nodes in a BST
In a BST, inorder traversal will give you every node in increasing order
Min abs diff will always be between two adjacent nodes because of this ordering
We can find min abs diff by subtracting every node val from the previous node val
Use a global variable to store the previous value, so to minimize extra space. 
Thos will be initialized to Infinity because first node will not have a previous value
Res varaible also initialized to Infinity, because we don't know how large the min abs diff will be

DFS inorder traversal helper function
Base case
If node is null, return null

For inorder traversal, we want to traverse the left subtree before doing any calculations
Check if absolute value of node.val - prev is less than current res
Set prev to current val as we get ready to check the next node in sequence
Traverse right subtree last

TC: O(n) we will have to traverse every node once because we need to check all absolute difference possiblities
SC: O(n) recursive stack will tbe the height of tree in worse cast, O(n) for skewed tree, O(logn) for balanced BST
 */
