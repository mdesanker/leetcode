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
