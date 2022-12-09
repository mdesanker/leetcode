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

// Dummy node implementation
var removeNthFromEnd = function (head, n) {
  // initialize p1 at dummy node that points to head
  let dummy = new ListNode(0, head);
  let p1 = dummy,
    p2 = head;

  // move p2 ahead n spaces
  while (n > 0 && p2) {
    p2 = p2.next;
    n--;
  }

  // move p1 and p2 until end of list
  while (p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  // skip p1's next node
  p1.next = p1.next.next;

  // return head of list
  return dummy.next;
};

/*
Time: O(N)
Space: O(1)
*/

// const removeNthFromEndOld = function (head, n) {
//   let p1 = head,
//     p2 = head;

//   // move p2 ahead n spaces
//   while (n--) {
//     p2 = p2.next;
//   }

//   // edge case: n = length of list, remove first element
//   if (!p2) return head.next;

//   // iterate to end of list
//   while (p2 && p2.next) {
//     p1 = p1.next;
//     p2 = p2.next;
//   }

//   // remove nth node
//   p1.next = p1.next ? p1.next.next : null;

//   return head;
// };
