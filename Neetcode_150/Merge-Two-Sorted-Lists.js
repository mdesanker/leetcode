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
