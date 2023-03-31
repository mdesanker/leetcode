/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const reverseList = function (head) {
  let current = head,
    prev = null;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};

/*
Time: O(n)
Space: O(1)
*/

/**
While traversing the list, we will change the current nodes next pointer to point to it's previous element (null if it's the first element)
Must store a reference to prev node because singly linked list does not have reference to previous node
ALso need pointer to store next node before changing the reference.
Return the head of the new list

TC: O(n) iterate through the entire list once
SC: O(1) no extra memory needed for storage
 */
