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

// Recursive DFS
var maxDepth = function (root) {
  if (!root) return 0;

  // calculate max depth for each substree and add 1 for this level
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// Time: O(n)
// Space: O(n)

/**
Recursive function so will not start returning values until we reach the bottom of the tree
Base case:
If we reach a point where node is null, return a height of 0 (there is no node)

At each node, we calculate the height of the left and right subtrees
The height of this node is going to be equal to 1 + Math.max(left, right)

We add 1 for the node itself, + the height of it's tallest subtree

TC: O(n) iterate over every node in the tree once
SC: O(n) recursive stack can be equal to height of tree. In a skewed tree, this will be equal to number of nodes, in a balanced tree will be O(logn)
 */

// Iterative BFS
var maxDepthBFS = function (root) {
  if (!root) return 0;

  let level = 0,
    queue = [root];
  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      // pop first element in queue and add children
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // increment level
    level++;
  }
  return level;
};

// Iterative DFS
var maxDepthDFS = function (root) {
  let res = 0;
  let stack = [[root, 1]]; // [node, level]

  while (stack.length) {
    let [node, depth] = stack.pop();

    if (node) {
      // set result to depth of node
      res = Math.max(res, depth);
      // push child nodes onto stack and increment depth
      stack.push([node.left, depth + 1]);
      stack.push([node.right, depth + 1]);
    }
  }
  return res;
};
