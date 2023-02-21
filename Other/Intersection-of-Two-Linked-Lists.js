/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  const set = new Set();
  let curr = headA;
  while (curr) {
    set.add(curr);
    curr = curr.next;
  }

  curr = headB;
  while (curr) {
    if (set.has(curr)) return curr;
    curr = curr.next;
  }
  return null;
};

// Time: O(n + m)
// Space: O(n)

/**
Explanation for O(1) space solution
Suppose two lists have different lengths, n = 5 and m = 8
Because the "tails" must be the same length, we can conclude that if there is an intersection, the intersection will be one of the last 5 possibilities
We would check this by starting a pointer at the start of the shorter list, and a pointer at the first possible matching node of the longer list
The position of this node is simply the difference between the two lengths, |m - n|

X - X - X - X - X - X - X - X
            X - X - X - X - X

We will step the pointers through the list, checking whether they are equal

We are essentially doing the four following steps:
1. Calculate n: length list A
2. Calculate m: length list B
3. Set the start pointer for longer list ahead |m - n| spaces
4. Step pointers together until they are equal

We can simplify this by starting a pointer at beginning of each list, when one gets to the end of its list, we set it to the head of the other list
and keep going until they are equal.
This will take at most 2 passes of each list, which is O(2m + 2n) -> O(m + n)

In the case where the lsits do not intersect, the pointers for A and B will still line up in second iteration
there just won't be a common node down the list and both pointers will reach their respective ends at the same time
Then pA will be null
 */
var getIntersectionNode = function (headA, headB) {
  let pA = headA,
    pB = headB;

  while (pA !== pB) {
    if (!pA) pA = headB;
    else pA = pA.next;
    if (!pB) pB = headA;
    else pB = pB.next;
  }
  return pA;
};

// Time: O(n + m)
// Space: O(1)
