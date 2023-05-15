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
// Two pass
var swapNodes = function (head, k) {
  const dummy = new ListNode(0, head);
  let curr = head;

  let p1 = head,
    p2 = head;

  for (let i = 1; i < k; i++) {
    p1 = p1.next;
  }

  for (let i = 1; i < k; i++) {
    curr = curr.next;
  }
  while (curr.next) {
    p2 = p2.next;
    curr = curr.next;
  }

  let temp = p1.val;
  p1.val = p2.val;
  p2.val = temp;

  return dummy.next;
};
// TC: O(n)
// SC: O(1)

// One pass
var swapNodes = function (head, k) {
  const dummy = new ListNode(0, head);
  let curr = head;

  let p1 = head,
    p2 = head;

  for (let i = 1; i < k; i++) {
    p1 = p1.next;
    curr = curr.next;
  }
  while (curr.next) {
    p2 = p2.next;
    curr = curr.next;
  }

  let temp = p1.val;
  p1.val = p2.val;
  p2.val = temp;

  return dummy.next;
};
// TC: O(n)
// SC: O(1)
