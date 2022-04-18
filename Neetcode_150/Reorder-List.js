/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */

const reorderList = function (head) {
  // find left halfway point
  let slow = head,
    fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // if list is odd length
  if (fast !== null) {
    slow = slow.next;
  }

  // reverse helper function
  function reverse(node) {
    let current = node,
      prev = null;
    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev;
  }

  // merge two halves
  let p1 = head,
    p2 = reverse(slow);
  while (p1 && p2) {
    let temp = p1.next;
    p1.next = p2;
    p1 = temp;

    temp = p2.next;
    p2.next = p1;
    p2 = temp;
  }

  // fix end of list if ends on p1 to prevent loop
  if (p1) {
    p1.next = null;
  }
};

/*
Time: O(N)
Space: O(1)
*/
