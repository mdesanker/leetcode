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
 * @return {string[]}
 */
// Single array
var binaryTreePaths = function (root) {
  let res = [];
  function getPaths(node, path) {
    if (!node) return null;

    // push current node onto path
    path.push(node.val);

    // if at a leaf node, join and push to result array
    if (!node.left && !node.right) {
      res.push(path.join("->"));
    }

    // continue down left and right children
    getPaths(node.left, path);
    getPaths(node.right, path);

    // pop last node
    path.pop();
  }
  getPaths(root, []);
  return res;
};

// Time: O(n)
// Space: O(n)

// Multiple arrays
var binaryTreePaths = function (root) {
  const res = [];

  function traverse(node, path) {
    if (!node) return;

    if (!node.left && !node.right) {
      res.push([...path, node.val]);
      return;
    }

    traverse(node.left, [...path, node.val]);
    traverse(node.right, [...path, node.val]);
  }

  traverse(root, []);
  return res.map((path) => path.join("->"));
};
