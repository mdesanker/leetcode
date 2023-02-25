/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) return null;

  const q = [root];

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();

      if (i === len - 1 || !q.length) node.next = null;
      else node.next = q[0];

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  return root;
};

// Time: O(n)
// Space: O(n)
