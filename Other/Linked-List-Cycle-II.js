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
// Flloyd's Algorithm
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

// Time: O(n) iterate through every node
// Space: O(1)

// Hash map implementation
var detectCycle2 = function (head) {
  const visited = new Set();

  let current = head;
  while (current) {
    if (visited.has(current)) return current;
    visited.add(current);
    current = current.next;
  }
  return null;
};

// Time: O(n)
// Space: O(n) set will hold every node until we find a duplicate in worst case
