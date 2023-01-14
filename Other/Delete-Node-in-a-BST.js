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

// Time: O(logn)
// Space: O(n)

// Official solution implementation

// var deleteNode = function(root, key) {
//   // next largest element - one step to right, then left as far as possible
//     function successor(node) {
//       node = node.right;
//       while (node.left) {
//         node = node.left;
//       }
//       return node.val;
//     }

//     // previous largest element - one step to left, then right as far as possible
//     function predecessor(node) {
//       node = node.left;
//       while (node.right) {
//         node = node.right;
//       }
//       return node.val;
//     }

//     // delete node functionality
//     if (!root) return null

//     // delete from right subtree
//     if (key > root.val) {
//       root.right = deleteNode(root.right, key);
//     // delete from left subtree
//     } else if (key < root.val) {
//       root.left = deleteNode(root.left, key);
//     // delete current node
//     } else {
//       // node is a leaf
//       if (!root.left && !root.right) {
//         root = null;
//         // node is not a leaf and has a right child
//       } else if (root.right) {
//         // find smallest value in right subtree to replace node
//         root.val = successor(root);
//         // delete the duplicate value from right subtree
//         root.right = deleteNode(root.right, root.val);
//         // node is not a leaf, has no right child, and has a left child
//       } else {
//         root.val = predecessor(root);
//         root.left = deleteNode(root.left, root.val);
//       }
//     }
//     return root;
// };
