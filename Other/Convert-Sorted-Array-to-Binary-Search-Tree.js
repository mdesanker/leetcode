/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;

  let left = 0,
    right = nums.length - 1;

  // root will be the mid-left point of nums because it is sorted
  const mid = Math.floor((left + right) / 2);
  const root = new TreeNode(nums[mid]);

  // build left and right subtrees from subarrays
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
};

// Time: O(n)
// Space: O(logn)
