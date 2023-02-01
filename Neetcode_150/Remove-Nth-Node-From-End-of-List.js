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
  for (let i = 0; i < n; i++) {
    p2 = p2.next;
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

// Time: O(n)
// Space: O(1)

/**
Need to move a pointer to node previous of the node we'd like to remove
Will initialize p1 to a dummy node pointing to the head node, so that it will lag 1 behind of the node we want to remove
Initialize p2 to head

Move p2 ahead n spaces using for loop
Then move both nodes ahead until p2 is at the end

p1 is now at the node previous of the node we want to remove
Remove the next node by setting:

p1.next = p1.next.next;

Return dummy.next to return the head

TC: O(n) interate through list once
SC: O(1) no additional memory needed
 */
