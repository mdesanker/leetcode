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
// Space: O(n)

/**
Every node is a single digit number, and we need the counts of each number to determine whether the path is pseudo-palindromic
If every digit has an even count, or only one digit has an odd count, then the path is pseudo-palindromic
We will use an array with 10 empty spaces to count the freqency of each digit. THe index in the array will correspond to the digit being counted
THen we can simply check for psuedo-palindromic by checking how many numbers have an odd freqency

Helper function to traverse tree
Base case
If node is null, return null

Add current node value to path by increasing its count

path[node.val]++;

If we are at a leaf node, then we want to check if the path is pseudo-palindromic. If the oddCount is <= 1, then it is possible to build a palindrome
out of the path elements, so we increment a global counter

if (!node.left && !node.right) {
  let oddCount = 0;
  for (let count of path) {
    if (count % 2 === 1) {
      oddCount++;
    }
  }
  if (oddCount <= 1) {
    res++;
  }
}

Then we recursively traverse left and right subtrees

We will call the helper function on the root node, passing an empty array of 10 0s as the starting path (it contains 0 count of every digit)

TC: O(n) traverse every node once to find all possible paths
SC: O(n) recursive stack is the height of the tree, O(n) for skewed tree, O(logn) for balanced tree
 */
