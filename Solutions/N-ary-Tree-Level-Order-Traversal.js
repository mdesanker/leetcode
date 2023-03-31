/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) return res;

  const q = [root];

  while (q.length) {
    let length = q.length,
      level = [];
    for (let i = 0; i < length; i++) {
      const node = q.shift();

      level.push(node.val);

      for (let child of node.children) {
        q.push(child);
      }
    }
    res.push(level);
  }
  return res;
};

// Time: O(n)
// Space: O(n)
