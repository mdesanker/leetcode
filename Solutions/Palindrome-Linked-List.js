/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // find middle
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  if (fast) slow = slow.next;

  // reverse second half
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

  let p1 = head,
    p2 = reverse(slow);

  // check first and second halves are palindromes
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
};

// Time: O(n)
// Space: O(1)

var isPalindrome = function (head) {
  const list = [];
  let curr = head;
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }

  let l = 0;
  r = list.length - 1;
  while (l < r) {
    if (list[l] !== list[r]) return false;
    l++;
    r--;
  }
  return true;
};

// Time: O(n)
// Sspace: O(n)
