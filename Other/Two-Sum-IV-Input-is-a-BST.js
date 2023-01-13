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
