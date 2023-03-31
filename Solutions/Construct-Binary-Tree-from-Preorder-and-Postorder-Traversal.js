// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/solutions/161268/c-java-python-one-pass-real-o-n/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  let preIndex = 0,
    postIndex = 0;

  function construct(preorder, postorder) {
    // create node as root
    const root = new TreeNode(preorder[preIndex]);
    preIndex++;

    // root will be lastly iterated in post order, so once root.val === postorder[postIndex], it means we have constructed whole tree
    // if not constructed tree, recursively build left and right subtrees
    if (root.val !== postorder[postIndex]) {
      root.left = construct(preorder, postorder);
    }
    if (root.val !== postorder[postIndex]) {
      root.right = construct(preorder, postorder);
    }

    // when we reach postIndex that root.val === postorder[postIndex], increment postIndex and return root node
    postIndex++;
    return root;
  }

  return construct(preorder, postorder);
};

// Time: O(n) iterate pre and post only once
// Space: O(h)
