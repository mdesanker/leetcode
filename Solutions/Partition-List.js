/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  const dummy = new ListNode(0);
  let p1 = dummy;

  const mid = new ListNode(0);
  let p2 = mid;

  let curr = head;
  while (curr) {
    if (curr.val < x) {
      p1.next = curr;
      p1 = p1.next;
    } else {
      p2.next = curr;
      p2 = p2.next;
    }
    curr = curr.next;
  }
  // end of second half will also point to end of first half
  // break cycle
  p2.next = null;

  // combine end of first half to beginning of second half
  p1.next = mid.next;

  // return head of first half of list
  return dummy.next;
};

// Time: O(n) iterate through list once
// Space: O(1) only additional memory needed for pointers

// Space O(n) solution would be to build each half of the list with new list nodes and then join them
