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
var levelOrder = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];

  while (queue.length > 0) {
    let length = queue.length,
      row = [];
    for (let i = 0; i < length; i++) {
      // shift first node off queue
      let current = queue.shift();
      // push node val onto row array
      row.push(current.val);

      // push left and right nodes onto queue
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    res.push(row);
  }

  return res;
};

// Time: O(n)
// Space: O(n)
