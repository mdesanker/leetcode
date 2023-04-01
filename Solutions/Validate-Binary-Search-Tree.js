/**
Solution -DFS

Traverse child nodes making sure that left node is smaller than parent and right node is larger than parent
To do this, need to pass a lower and upper limit with each function call so we know range of permissible values

n = number of nodes in tree
TC: O(n) must check every node in tree once
SC: O(n) space needed for recursive stack. Worst case scenario (skewed tree), every node will be in the stack. O(logn) for balanced tree
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  function dfs(node, left, right) {
    // base case
    if (!node) return true;

    // node val must be smaller than upper bound and greater than lower bound
    if (!(node.val < right && node.val > left)) return false;

    // run on child nodes, modifying left and right limits as needed
    return dfs(node.left, left, node.val) && dfs(node.right, node.val, right);
  }
  // run on root with initially unbounded limits
  return dfs(root, -Infinity, Infinity);
};

// Time: O(n) since visit each node once
// Space: O(n) since keep up to the entire tree

/**
We need to make sure that each node has a value that meets the requirements for a BST
If a node is a left child, then its value must be smaller than its parent, if its a right child, then its value must be greater than its parent
Pass upper and lower limits as parameters along with the node in the helper function

Base case
If a node is null, then it is a valid node, return true
If a node is outside its allowed limits, then immediately return false

If a node value is less than the upper limit and greater than the lower limit then it is a valid node, will continue and check the children
For a tree to be valid, both the left subtree AND right subtree must also be valid
For the left subtree, the current node.val becames the upper limit
For the right subtree, the current node.val becomes the lower limit

Call helper on root function if -Infinity and Infinity as lower and upper limit respectively, and as the root can have any value

TC: O(n) every node is traversed once
SC: O(n) recursive stack will be the height of the tree in the worst case scenario. In a skewed tree, this will be equal to the number of nodes
 */
