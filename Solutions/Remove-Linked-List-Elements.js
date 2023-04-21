/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (!head) return null;

  const dummy = new ListNode(0, head);
  let prev = dummy,
    curr = head;

  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next;
    } else {
      prev.next = curr;
      prev = prev.next;
    }
    curr = curr.next;
  }
  return dummy.next;
};
// TC: O(n)
// SC: O(1)
