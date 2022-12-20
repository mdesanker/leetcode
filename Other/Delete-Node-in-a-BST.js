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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  // helper function to find min node in BST
  function findMin(node) {
    let current = node;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  if (!root) return null;

  // find key in tree
  if (key < root.val) {
    return deleteNode(root.left, key);
  } else if (key > root.val) {
    return deleteNode(root.right, key);
  } else {
    // node only has 1 child
    if (!root.left) {
      return root.right;
    } else if (!root.right) {
      return root.left;
    } else {
      // node has 2 children, replace with smallest node in right subtree (next largest value)
      const minNode = findMin(root.right);
      root.val = minNode.val;
      // remove copied node from right subtree
      root.right = deleteNode(root.right, minNode.val);
    }
  }
  return root;
};

// Time: O(logn)
// Space: O(n)
