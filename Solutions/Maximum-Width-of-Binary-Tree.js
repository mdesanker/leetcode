/**
Solution: BFS Traversal

The queue will need to store the node and it's position

Because this is a binary tree, the position of the child nodes will be 2 * pos and 2 * pos + 1

        1
      2   3
    4  5 6  7
Node 1 connected to node 2 and 3
Node 2 connected to node 4 and 5
Node 3 connected to node 6 and 7
etc...

We need to normalize pos as we go along, to prevent integer overflow on late test cases
This is done by subtracting the amount of the starting position for each level

TC: O(n) traverse every node
SC: O(n) due to nature of BFS, q holds at most 2 levels of nodes. In worst case scenario, 
  a level in a full binary tree contains half of the nodes O(n/2) -> O(n)
  */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;
  const q = [[root, 0]];
  let max = 0;
  while (q.length) {
    let len = q.length,
      start = q[0][1],
      end = q[q.length - 1][1];
    max = Math.max(max, end - start + 1);
    for (let i = 0; i < len; i++) {
      let [node, pos] = q.shift();
      pos = pos - start;

      // 2 * pos and 2 * pos + 1 is a property of binary tree

      if (node.left) q.push([node.left, 2 * pos]);
      if (node.right) q.push([node.right, 2 * pos + 1]);
    }
  }
  return max;
};
// TC: O(n)
// SC: O(n)
