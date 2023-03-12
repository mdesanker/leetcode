/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;
  let maxWidth = 0;

  const q = [[root, 0]];
  while (q.length) {
    let len = q.length,
      minIndex = q[0][1],
      maxIndex = q[len - 1][1];
    maxWidth = Math.max(maxWidth, maxIndex - minIndex + 1);
    for (let i = 0; i < len; i++) {
      const [node, col] = q.shift();

      const normalizedIndex = col - minIndex;

      if (node.left) q.push([node.left, 2 * normalizedIndex]);
      if (node.right) q.push([node.right, 2 * normalizedIndex + 1]);
    }
  }
  return maxWidth;
};

// Time: O(n)
// Space: O(n)
