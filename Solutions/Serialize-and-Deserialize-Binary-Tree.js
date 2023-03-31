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

/**
This problem can be solved with BFS, where you serialize and then build tree level by level, but with DFS it's easier to write

Serialize:
Serialize the tree using preorder DFS because we can easily identify the root node and its left and right children at every step
Will store the traversal in an array, and then join that array with a delimiter (#) when we are returning it, because we need to return a string

Helper function
If a node is null, we want to add a marker to the array, so that we know when a subtree is finished and we need to move to the next subtree
For null node, push "N" onto res array then return

For preorder traversal, we handle the root node before traversing the left and then the right child node
Push node.val onto res
Recursively call helper function on node.left, then node.right

Call the helper function on the root node
Return the res array joined with a delimiter ("#")

Deserialize:
We receive the data as a string with values separated by a delimiter. It will be easier to work with this if we convert to an array
Split data at the chosen delimiter ("#")

We will use a pointer to keep track of where in the array we are
This will be less time intensive than popping every value off the front of the array, which is an O(n) operation

Helper function to build the tree
This helper function will return the node corresponding to the current value in the vals array
If we are at a "N" value, indicating we have a null value, we will return null
It is still important to increment the pointer in this case

If we have an actual value, we will build a node
Set the root equal to a new TreeNode created by converting the current value at the pointer into a number
Then we increment the pointer, so that we can build the left child
Recursively call the helper function to create root.left, then root.right

Return root because we want the helper function to return the node that has been created

In the main function, return the call of the helper function

TC: O(n) every node is traversed once, first to serialize the tree, and then to deserialize the tree
SC: O(n) we build an array to hold the preorder dfs traversal of the tree, and then convert the data string into an array that we build the tree from
 */
