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
 * @return {number}
 */
var maxProduct = function (root) {
  // return answer modulo 10^9 + 7 in case too large
  const MOD = Math.pow(10, 9) + 7;
  // store subTree sums in array
  let subSum = new Array();

  function dfs(root) {
    // if root null return 0
    if (!root) return 0;

    // push new sum to array: val of current root + val os subtree branches
    subSum.push(root.val + dfs(root.left) + dfs(root.right));

    // return last subSum in array to get total sum of binary tree
    return subSum.at(-1);
  }

  let sum = dfs(root);
  // return max of subtree sum (val) * sum of rest of tree (sum - vaal)
  return Math.max(...subSum.map((val) => val * (sum - val))) % MOD;
};

// Time: O(N)
// Space: O(N)
