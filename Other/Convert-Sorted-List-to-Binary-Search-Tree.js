/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  // convert list to array
  const list = [];
  let current = head;
  while (current) {
    list.push(current.val);
    current = current.next;
  }

  // convert array to BST
  function buildTree(nums) {
    if (!nums.length) return null;

    let left = 0,
      right = nums.length - 1;

    const mid = left + Math.floor((right - left) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = buildTree(nums.slice(0, mid));
    root.right = buildTree(nums.slice(mid + 1));

    return root;
  }

  return buildTree(list);
};

// Time: O(n)
// Space: O(n)
