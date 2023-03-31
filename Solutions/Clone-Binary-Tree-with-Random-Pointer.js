/**
 * // Definition for a Node.
 * function Node(val, left, right, random) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.random = random === undefined ? null : random;
 * };
 */

/**
 * @param {Node} root
 * @return {NodeCopy}
 */
var copyRandomBinaryTree = function (root) {
  if (!root) return null;

  const clones = new Map();

  function clone(node) {
    if (!node) return null;

    // if clone of node already exists, return it
    if (clones.has(node)) return clones.get(node);

    // create new node and set pointers
    const newNode = new NodeCopy(node.val);
    clones.set(node, newNode);
    newNode.left = clone(node.left);
    newNode.right = clone(node.right);
    newNode.random = clone(node.random);

    return newNode;
  }
  return clone(root);
};

// Time: O(n)
// Space: O(n)
