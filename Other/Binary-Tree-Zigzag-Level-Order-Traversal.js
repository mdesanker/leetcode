/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const res = [];
  if (!root) return [];
  const q = [root];
  let dir = 1;
  while (q.length) {
    let length = q.length,
      level = [];
    for (let i = 0; i < length; i++) {
      const node = q.shift();
      dir === 1 ? level.push(node.val) : level.unshift(node.val);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
    dir *= -1;
  }
  return res;
};

// Time: O(n)
// Space: O(n) worst case scenario, queue will hold all nodes in tree
