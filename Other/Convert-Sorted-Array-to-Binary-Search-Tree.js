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

  function buildBST(l, r) {
    const mid = Math.floor((l + r) / 2);
    const root = new TreeNode(nums[mid]);

    if (mid - 1 >= l) root.left = buildBST(l, mid - 1);
    if (mid + 1 <= r) root.right = buildBST(mid + 1, r);

    return root;
  }

  return buildBST(0, nums.length - 1);
};

// Time: O(n) we do not build any new arrays, so we traverse every index in array once
// Space: O(n) for the tree

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

// Time: O(nlogn) we build new arrays of combined length n at every step (1st: n/2 + n/2, 2nd: n/4 + n/4 + n/4 + n/4) and
//    height of recursive stack is height of the tree in a balanced tree (logn)
// Space: O(n)
