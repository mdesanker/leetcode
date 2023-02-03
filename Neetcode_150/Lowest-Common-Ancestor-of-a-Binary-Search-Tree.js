/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

const lowestCommonAncestor = function (root, p, q) {
  let current = root;

  while (current) {
    // if p and q are lower than current, move to left
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
      // if p and q are larger than current, move to right
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
      // if current is between p and q, return current
    } else {
      return current;
    }
  }
};

// Time: O(n)
// Space: O(1)

/**
LCA of two nodes is the last ancestor that is common to both of them
Can use properties of a binary search tree to develop algorithm

If p.val and q.val are both less than current.val, they will both be found in the left subtree of the current node, which means that current will not be their lowest common ancestor
Return the recursive call on current.left
Likewise for the right subtree if both values are greater

If current falls between both node values, then we cannot move to the left or right subtree and still keep both nodes within the subtree. Current is therefore the LCA

TC: O(n) worst case scenario we check every node in a skewed BST. In a balanced BST, the average TC is O(logn) as we remove half the tree from consideration with each step until we find the LCA
SC: O(1) no additional memory needed
 */
