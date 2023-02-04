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
  // want to replace target with next largest value in tree (find smallest value in right subtree)
  // so do not have to move other values in tree

  // helper function to find min node in BST
  function findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  if (!root) return null;

  // find key in tree
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // node is a leaf node - return root.right which is null
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

// Time: O(n)
// Space: O(n)

/**
We will traverse the tree to find a node that matches the key we want to remove
If we don't find a valid node, we will return null

Once we find a node
1. Node is a leaf node - if node has no chilren, we can set it to null
2. Node has one child - if node has only one child, we set it to the value of its only child
Both of these conditions are handled by the same code:

if (!root.left) return root.right;
else if (!root.right) return root.left;

If node has no children, root.left will be null, so it will set current node to root.right, which is also null

3. Node has two children
If the node has two children, we need to pick a node to replace it with
It will require the least amount of work to pick the largest node that is smaller than it, or the smallest node that is larger than it.
Then, if we replace the current node with one of these nodes, we will still have a valid BST
A helper function can be used to find this node (example to find smallest larger node)

function findMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}

We will call this function on the right subtree of the node to be deleted to get minNode, so we will find the smallest value in the subtree which will be the smallest node that is greater than the node to be deleted
We will replace the current node with the value of the minNode
Then we will delete the minNode from the right subtree (this will be simple deletion because this node will be a leaf node)

const minNode = findMin(root.right);
root.val = minNode.val;
root.right = deleteNode(root.right, root.val); // root.val is same as minNode.val

Return the root of the BST at the end

TC: O(n) average TC is O(logn) because we cut down search area by half with every step until we find node to delete. But if we have a skewed tree and want to delete the leaf node, we will have to traverse every node once
SC: O(n) recursive stack will be the height of the tree, O(n) for a skewed tree, O(logn) for a balanced tree
 */
