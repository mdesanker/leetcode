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

/**
For level order traversal, we must use a queue to track next level of nodes to visit. Queue is initially populated with on the root node.
Also initialize an array to hold the result

In the while loop, we need to put the length of each level in a variable, because this will change as we push and pop items from queue.
We will also need an array to store node vals for the particular level.
Loop through indices of nodes for this level
Push each node val into the array for the current level
If node has child nodes, push their children onto the queue to be traversed in next level
After iterating through current level, push level array onto res array

TC: O(n) every node traversed once
SC: O(n) to build the result array
 */
