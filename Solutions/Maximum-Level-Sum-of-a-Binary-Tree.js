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
 * @return {number}
 */
var maxLevelSum = function (root) {
  if (!root) return 1;
  const q = [root];
  const res = [];
  let max = -Infinity;
  while (q.length) {
    let len = q.length,
      sum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      sum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    max = Math.max(max, sum);
    res.push(sum);
  }
  return res.indexOf(max) + 1;
};
// TC: O(n)
// SC: O(n)

var maxLevelSum = function (root) {
  if (!root) return 1;
  const q = [root];
  let max = -Infinity,
    maxLevel = 0,
    currLevel = 0;
  while (q.length) {
    let len = q.length,
      sum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      sum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    currLevel++;
    if (sum > max) {
      max = sum;
      maxLevel = currLevel;
    }
  }
  return maxLevel;
};
// TC: O(n)
// SC: O(n)
