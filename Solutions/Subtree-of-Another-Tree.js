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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  // isSameTree question
  function sameTree(s, t) {
    if (!s && !t) return true;
    if (!s || !t) return false;
    if (s.val !== t.val) return false;

    return sameTree(s.left, t.left) && sameTree(s.right, t.right);
  }

  if (!subRoot) return true; // subtree is empty
  if (!root) return false; // tree is empty, subtree is not empty

  if (sameTree(root, subRoot)) return true; // same tree

  // is subRoot a subtree of either left or right child
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

// Time: O(mn) where n and m are number of nodes in root and subroot
// Space: O(n + m)

/**
If a tree is a subtree of another tree, then the subtree and tree are the same tree

Build a sameTree helper function (leetcode easy)

Base cases:
If subroot is null, every tree has a null child, so we can return true automatically
If root is null, then we can return false automatically. If we got to this check, then we know that subRoot is not null, and we cannot have a not-null subtree of a null tree
If root and subRoot are the same tree (using helper function) return true

Next we recursively check whether the left subtree OR the right subtrees are same trees as the subRoot

TC: O(n * m) for every n node, we check if the tree rooted at this node is same as subRoot, where m is number of nodes in subRoot
SC: O(n + m) there will be at most n recursive calls of isSubtree, and within each of those there will be at most m recursive calls of sameTree. So maximum number of items in the call stack will be n + m
 */
