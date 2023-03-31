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
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  let count = 0;
  const map = new Map();
  // seed map with initial key:value
  map.set(0, 1);

  function traverse(node, sum) {
    if (!node) return 0;

    // current prefix sum
    sum += node.val;

    if (map.has(sum - targetSum)) count += map.get(sum - targetSum);

    // add current sum into map to use for child processing
    map.set(sum, map.get(sum) + 1 || 1);

    // process children
    traverse(node.left, sum);
    traverse(node.right, sum);

    // remove current sum from map so not used for parallel subtree processing
    map.set(sum, map.get(sum) - 1);
  }

  traverse(root, 0);
  return count;
};

// Time: O(n)
// Space: O(n)

var pathSum = function (root, targetSum) {
  let count = 0;
  // map will track currSums and their frequencies of occurence
  const map = new Map();

  function dfs(node, currSum) {
    // base case
    if (!node) return null;

    // add current node to currSum
    currSum += node.val;

    // situation 1
    // path with targetSum is at the beginning of the traversal
    // if currSum equals the targetSum, then increment count by 1
    if (currSum === targetSum) count++;

    // situation 2
    // path with the target sum starts somewhere in the middle
    // increase count by the number of times we have seen the prefix sum (currentSum - targetSum)
    count += map.get(currSum - targetSum) || 0;

    // Add the currSum to the map so it can be used for the rest of the nodes in the path
    map.set(currSum, map.get(currSum) + 1 || 1);

    dfs(node.left, currSum);
    dfs(node.right, currSum);

    // remove currSum from map for other paths
    map.set(currSum, map.get(currSum) - 1);
  }
  dfs(root, 0);
  return count;
};

/**
Use prefix sum technique for problems like "find a number of continuous subarrays/submatrices/tree paths that sum to target"

Implementation is pretty straightforward but not very intuitive

Initialize a global count variable to track the number of paths that sum to target
Initialize a map that will map currSums to frequencies of occurence in the path

Helper function
We will use preorder dfs traversal to build path sums and check for matches with targetSum

Base case
If node is null, return null, there is nothing to add to currSum

Add current node value to currSum

For prefix sum technique, there are two situations to consider
1. path with targetSum starts at root of the tree
2. path with targetSum starts somewhere in the middle of the path between root and leaf node

1. If path with targetSum starts at root, then currSum will equal targetSum
If this happens, then increase count by 1

if (currSum === targetSum) count++;

2. If path with targetSum starts somewhere in the middle, then we will check for freq of the prefix sum in the map
If the prefix sum occurs in the map, then we have a continuous series of nodes that equals the targetSum

count += map.get(currSum - targetSum) || 0;

Important to use `|| 0;` because if key does not exist in map, then first part will return null

Then we add currSum to map before traversing the left and right children, then remove currSum from map when we backtrack so we can traverse other paths

Call dfs helper function on root node with currSum initialized to 0

TC: O(n) we will traverse every node once to check all possibilities
SC: O(n) we build a map to hold all currSums
 */
