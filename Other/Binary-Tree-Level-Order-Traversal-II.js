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
var levelOrderBottom = function (root) {
  if (!root) return [];

  const res = [];
  const q = [root];
  while (q.length) {
    let length = q.length,
      row = [];
    for (let i = 0; i < length; i++) {
      const node = q.shift();
      row.push(node.val);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.unshift(row);
  }
  return res;
};

// Time: O(n)
// Space: O(n)
