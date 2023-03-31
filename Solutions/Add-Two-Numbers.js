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

// Time: O(max(M, N)) where M and N are lengths of l1 and l2
// Space: O(max(M, N)) where M and N are lengths of l1 and l2

/**
Will build a new list off of a dummy node to hold the answer
Will also need a variable to track the sum of the current numbers we are considering and a carry value if the sum >= 10

While there are digits left in l1 or digits left in l2 or sum (sum will be used for carry when moving to next set of digits)

If l1 has node - add value of node to sum, move l1 to l1.next
If l2 has node - add value of node to sum, mode l2 to l2.next

We can't have a digit greater than 9, so if sum >= 10, subtract 10 from sum and set carry to 1

Create new node on answer list and set its value to sum
Move pointer ahead so we can add next digit

We will transfer carry to sum as we will add next digits to sum variable. Set carry to 0

At the end, return dummy.next

TC: O(max(n, m)) we iterate through both l1 and l2. We iterate over the entirety of the two lists, so whichever has the longest length
SC: O(max(n, m)) the result will either be the length of the longest list or the longest list + 1 (if there is a carry on the last digit)
 */
