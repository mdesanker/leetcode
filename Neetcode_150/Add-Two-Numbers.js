/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(),
    head = dummy,
    sum = 0,
    carry = 0;

  while (l1 || l2 || sum) {
    // add digit from l1
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }

    // add digit from l2
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }

    // extract carry and set sum to 1 digit
    if (sum >= 10) {
      sum -= 10;
      carry = 1;
    }

    // create node for new digit and move pointer
    head.next = new ListNode(sum);
    head = head.next;

    // preserve carry if l1 and l2 are done
    sum = carry;
    carry = 0;
  }
  return dummy.next;
};

/*
Time: O(max(M, N)) where M and N are lengths of l1 and l2
Space: O(max(M, N)) where M and N are lengths of l1 and l2
*/
