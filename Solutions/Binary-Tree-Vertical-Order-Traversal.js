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
var verticalOrder = function (root) {
  // use hashmap to map columns to nodes
  const colMap = {};
  const q = [[root, 0]]; // [node, column];

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [node, col] = q.shift();

      if (!node) continue;

      // push node into respective column array in hashmap
      colMap[col] ? colMap[col].push(node.val) : (colMap[col] = [node.val]);

      // push left and right nodes to queue while modifying column value
      if (node.left) q.push([node.left, col - 1]);
      if (node.right) q.push([node.right, col + 1]);
    }
  }
  // sort keys in hashmap
  const sortedKeys = Object.keys(colMap).sort((a, b) => a - b);
  // map sorted keys to corresponding node value arrays
  return sortedKeys.map((key) => colMap[key]);
};

// Time: O(nlogn) --> O(n) to traverse tree, O(nlogn) to sort
// Space: O(n)
