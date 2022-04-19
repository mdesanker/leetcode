/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const detectCycle = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;

    // find if there is a loop
    if (slow === fast) {
      slow = head;

      // use floyd's alg to find start of loop
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
};

/*
Time: O(N)
Space: O(1)
*/
