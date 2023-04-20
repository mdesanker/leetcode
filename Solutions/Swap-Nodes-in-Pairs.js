/**
Solution - Iterative 

Traverse two nodes at a time, swapping them, until we reach the end of the list
 */
// Iterative
var swapPairs = function (head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (head && head.next) {
    let first = head,
      second = head.next;

    prev.next = second;
    first.next = second.next;
    second.next = first;

    prev = first;
    head = first.next;
  }
  return dummy.next;
};
// TC: O(n)
// SC: O(1)

// Recursive
var swapPairs = function (head) {
  if (!head || !head.next) return head;

  let first = head,
    second = head.next;

  first.next = swapPairs(second.next);
  second.next = first;

  return second;
};
// TC: O(n)
// SC: O(n)
