/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  const list = [];
  let curr = head;
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }

  let l = 0,
    r = list.length - 1;
  let max = -Infinity;
  while (l < r) {
    max = Math.max(max, list[l] + list[r]);
    l++;
    r--;
  }
  return max;
};
// TC: O(n)
// SC: O(n)
