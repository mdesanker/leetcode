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
var addTwoNumbers = function (l1, l2) {
  // reverse both lists
  // sum lists (Add Two Numbers)
  // reverse result
  function reverse(node) {
    let prev = null,
      curr = node;
    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev;
  }

  let n1 = reverse(l1),
    n2 = reverse(l2);

  const dummy = new ListNode();
  let curr = dummy;

  let sum = 0,
    carry = 0;

  while (n1 || n2 || sum) {
    if (n1) {
      sum += n1.val;
      n1 = n1.next;
    }
    if (n2) {
      sum += n2.val;
      n2 = n2.next;
    }

    if (sum > 9) {
      sum -= 10;
      carry = 1;
    }

    curr.next = new ListNode(sum);
    curr = curr.next;

    sum = carry;
    carry = 0;
  }

  return reverse(dummy.next);
};

// TC: O(n + m)
//    O(n) to reverse l1
//    O(m) to reverse l2
//    O(max(n, m)) to sum
//    O(max(n, m)) to reverse result
//    O(n) + O(m) + 2 * O(max(n, m)) -> O(n + 3m) || O(3n + m) -> O(n + m)
// SC: O(max(n, m))
