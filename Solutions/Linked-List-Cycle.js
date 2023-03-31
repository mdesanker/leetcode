/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

const hasCycle = function (head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }
  return false;
};

/*
Time: O(n)
Space: O(1)
*/

/**
Use fast and slow pointers, if there is a loop then slow and fast pointer will eventually be equal
If this happens then return true.
If there is no loop, then we will eventually get to the end of the list and the loop will stop
Then we can return false

TC: O(n) iterate through the list once
SC: O(1) no additional memory needed
 */
