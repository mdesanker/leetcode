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
// DFS pre-order traversal
var sumNumbers = function (root) {
  let res = 0;

  function dfs(node, currNum) {
    if (!node) return 0;

    const curr = currNum * 10 + node.val;

    if (!node.left && !node.right) {
      res += curr;
      return;
    }

    dfs(node.left, curr);
    dfs(node.right, curr);
  }

  dfs(root, 0);
  return res;
};

// Time: O(n)
// Space: O(n)

/**
Build numbers using numbers in root-leaf paths as digits and add all numbers together

Helper function will need node and currNum as parameters
We will build the currNum as we go along, instead of adding nums to a path array and converting at the end to minimize additional memory requirement

Base case
If reach null node, return null

Calculate new currNum by multiplying previous number by 10 to shift the digits to the left
Then we can add current node.val to the ones place

e.g. 23 * 10 + 1 = 230 + 1 = 231

If we are at a leaf node, we have reached the end of a number, add this to global result counter

If we are not at a leaf node, traverse left and right children using updated currNum

Call helper function on root with initial currNum = 0

TC: O(n) we will traverse every node once to find all potential numbers
SC: O(n) No additional memory needed for currNum if its a variable, but would be O(n) for an array containing path digits
Recursive stack will be the height of the tree, O(n) for a skewed tree, and O(logn) for a balanced tree
 */
