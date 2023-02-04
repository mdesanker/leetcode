/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const res = [];

  // preorder dfs traversal of tree
  function dfs(node) {
    // if node is null, we want to push a marker so we know where subtrees end
    if (!node) {
      res.push("N");
      return;
    }
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  // return the tree as a string with nodes delimited with #
  return res.join("#");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // split string at # delimiter
  const vals = data.split("#");
  // use pointer to track position in array
  let i = 0;

  // dfs function will return the node to be placed at each position
  function dfs() {
    // return null "node" for "N" markers
    if (vals[i] === "N") {
      // increment pointer every time a value is consumed
      i++;
      return null;
    }
    // use value at pointer i (converted to a number) to create root for this subtree
    const root = new TreeNode(Number(vals[i]));
    // increment pointer every time a value is consumed
    i++;
    // build left and right subtrees for current root because preorder traversal means these nodes will be next
    root.left = dfs();
    root.right = dfs();
    // return the root so it is placed where this function was called
    return root;
  }

  // root of tree is returned from dfs()
  return dfs();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// Time: O(n) every node is traversed once
// Space: O(n) for the array/string that holds all nodes
