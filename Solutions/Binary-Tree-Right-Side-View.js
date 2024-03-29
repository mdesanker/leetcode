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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return [];

  const res = [];
  const q = [root];

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const node = q.shift();
      // only push farthest right node val
      if (i === length - 1) res.push(node.val);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
};

// Time: O(n)
// Space: O(n)

/**
Same as level order traversal except we dont need to track every item in the level
 and we only push to the result array if we are at the last element in the row

if (i === length - 1) res.push(node.val);

TC: O(n) every node is traversed once
SC: O(n) to build the result. In a skewed tree, the number of elements in result array will equal number of nodes
 */
