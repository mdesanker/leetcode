/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) return null;

  let p1 = head,
    p2 = head;
  // find length of list
  let n = 1;
  while (p1.next) {
    p1 = p1.next;
    n++;
  }
  // loop end to beginning
  p1.next = head;

  // new tail = (n - k % n - 1)
  // new head = (n - k % n)
  for (let i = 0; i < n - (k % n) - 1; i++) {
    p2 = p2.next;
  }
  let newHead = p2.next;
  p2.next = null;
  return newHead;
};
// TC: O(n)
// SC: O(1)
