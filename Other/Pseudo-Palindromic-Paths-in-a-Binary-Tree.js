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
var pseudoPalindromicPaths = function (root) {
  // count number of pseudo-palindromic paths
  let count = 0;

  // path is an array [0 - 9], where value at each index is the count of occurences of that element in the path
  function traverse(node, path) {
    if (!node) return null;

    path[node.val]++;

    if (!node.left && !node.right) {
      // odd length palins can have 1 digit with odd count
      // even length palins will have every digit with even count
      let oddCount = 0;
      for (let num of path) {
        if (num % 2 === 1) {
          oddCount++;
        }
      }
      // increment count if valid palin
      if (oddCount <= 1) count++;
      return;
    }

    // traverse to leaf nodes
    traverse(node.left, [...path]);
    traverse(node.right, [...path]);
  }

  traverse(root, new Array(10).fill(0));
  return count;
};

// Time: O(n)
// Space: O(h)
