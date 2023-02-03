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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  const visited = new Set();

  function traverse(node) {
    if (!node) return false;

    // check if difference exists in set of visited nodes
    if (visited.has(k - node.val)) return true;

    // add node to visited set
    visited.add(node.val);

    // check child nodes
    return traverse(node.left) || traverse(node.right);
  }

  return traverse(root);
};

// Time: O(n)
// Space: O(n)

/**
We will create a set that will hold all the numbers that have been traversed so far

A helper function will traverse every node in the tree
Base case
If node is null, return false

At every node, we will calculate a difference - what number would we have to add to current node.val to equal the target (k)
Then we will check if this difference exists in the set, if it does, then immediately return true because we know there is a pair of numbers
in the tree that we could add to reach the target

If we didn't find a match, add the current node.val to the set so it is there for comparison to the other numbers we encounter

Then we check whether we can find a pair in the left subtree OR right subtree

TC: O(n) worst case scenario every node is traversed only once
SC: O(n) the set will potentially hold every node in the tree
 */

// Generate inorder traversal to arrange numbers in increasing order, then use two pointer approach

// var findTarget = function(root, k) {
//     const inOrder = [];

//     function traverse(node) {
//         if (!node) return null;
//         traverse(node.left);
//         inOrder.push(node.val);
//         traverse(node.right);
//     }

//     traverse(root);

//     let l = 0, r = inOrder.length - 1;
//     while (l < r) {
//         let sum = inOrder[l] + inOrder[r];
//         if (sum === k) return true;
//         else if (sum < k) l++;
//         else r--;
//     }
//     return false;
// };

// Time: O(n)
// Space: O(n)
