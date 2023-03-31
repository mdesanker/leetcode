/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  // tree nodes starts from 0 to n - 1
  // if node is not a child(not in LC or RC), then it's a root node
  function findRoot(left, right) {
    let root = 0;
    const children = new Set([...left, ...right]);

    for (let i = 0; i < n; i++) {
      if (!children.has(i)) root = i;
    }
    return root;
  }

  const root = findRoot(leftChild, rightChild);
  const visited = new Set();
  const q = [root];

  while (q.length) {
    let length = q.length;

    for (let i = 0; i < length; i++) {
      const node = q.shift();
      if (visited.has(node)) return false;

      visited.add(node);

      // add child nodes to queue
      if (leftChild[node] !== -1) q.push(leftChild[node]);
      if (rightChild[node] !== -1) q.push(rightChild[node]);
    }
  }
  // if valid tree: visited = number of node
  // all nodes are visited exactly once from 0 to n - 1 nodes
  return visited.size === n;
};

// Time: O(n)
// Space: O(n)
