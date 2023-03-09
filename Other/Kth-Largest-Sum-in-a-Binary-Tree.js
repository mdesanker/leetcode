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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  // level order traversal of tree
  // TC: O(n) - traverse every node
  // SC: O(n) - worst case scenario, queue contains every node in tree
  if (!root) return 0;
  const tree = [];
  const q = [root];

  while (q.length) {
    let len = q.length,
      levelSum = 0;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      levelSum += node.val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    tree.push(levelSum);
  }

  // sort
  // TC: O(nlogn) - language dependent
  // SC: O(logn) - language dependent
  tree.sort((a, b) => b - a);
  return tree[k - 1] || -1;
};

// Overall
// TC: O(nlogn)
// SC: O(logn)
