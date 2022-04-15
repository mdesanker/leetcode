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

/*
Time: O(logN)
Space: O(1)
*/
