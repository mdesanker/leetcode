/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

const removeNthFromEnd = function (head, n) {
  let p1 = head,
    p2 = head;

  // move p2 ahead n spaces
  while (n--) {
    p2 = p2.next;
  }

  // edge case: n = length of list, remove first element
  if (!p2) return head.next;

  // iterate to end of list
  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next;
  }

  // remove nth node
  p1.next = p1.next ? p1.next.next : null;

  return head;
};

/*
Time: O(N)
Space: O(1)
*/
