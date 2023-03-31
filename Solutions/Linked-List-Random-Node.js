/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 */
var Solution = function (head) {
  this.range = [];
  while (head) {
    this.range.push(head.val);
    head = head.next;
  }
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  const pick = Math.floor(Math.random() * this.range.length);
  return this.range[pick];
};

// Time: O(n)
// Space: O(n)
