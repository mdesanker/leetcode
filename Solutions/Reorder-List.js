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
  while (fast && fast.next) {
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

/**
Goal is to merge the reverse of the second half of the list into the first half of the list
Steps:
1. Find mid point of list
2. Reverse the second half of the list
3. Merge first and second half

1. Find mid point of list
Use slow and fast pointer approach to find mid point of linked list. Fast pointer will travel twice the distance of the slow pointer, 
so when the fast pointer reaches end of the list, the slow pointer will be at the mid point

Edge case: if the linked list has an odd length, the fast pointer will stop at the last element of the list, and the slow pointer will
be on the middle element. We want to start reversing from the next element in this case, so:

if (fast !== null) slow = slow.next;

In even length linked lists, the slow pointer will stop on the middle right element, which is what we want

2. Reverse second half of list
Declare a helper function to reverse the second half of the linked list

3. Merge two lists
Initialize a pointer to head, and another pointer to slow list reversed
While both of these lists have elements
We will take element from p1, then element from p2, and repeat until one list is empty:

Set temp pointer to p1.next, as this will be lost when we reassign the reference
Set p1.next to p2
Update p1 to temp

Set temp pointer to p2.next
Set p2.next to p1
Update p2 to temp

At the end of this, p1 will point to the element that comes before it, creating a loop (because p1 points to head of the original list,
which was not cut in half)
Break the loop by pointing p1.next to null

TC: O(n) find middle of list O(n), reverse second half of list O(n), merge lists O(n)
SC: O(1) no additional memory needed 
 */
