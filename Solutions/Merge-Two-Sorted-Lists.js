/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // create dummy node to build list off of
  const dummy = new ListNode(0, null);
  let tail = dummy;

  // while both lists have values, set next to smaller value
  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  // if one list is longer, append to end of tail
  tail.next = list1 || list2;

  // return head
  return dummy.next;
};

// Time: O(min(N, M)) where N and M are lengths of the two linked lists
// Space: O(1)

/**
Build a new list from a dummy node, as opposed to trying to merge one list into another list.
Create a new dummy node to act as the head of the next list.
While both list1 and list2 have values remaining, use if else statement to add the smallest of the two front values in each list.
Once one of the lists has been depleted, we need to add the remainder of the other list, if any, onto the end of the new list.
Return dummy.next to return the head of the new list

TC: O(min(n, m)) we traverse both lists for the length of the shortest list, then the remainder of the longer list 
is tacked on to the end with a single 
SC: O(1) no additional memory needed because new list created is returned as the result
 */
