/**
 * @param {number} n
 * @return {string[]}
 */

const generateParentheses = function (n) {
  const res = [],
    stack = [];

  function backtrack(openN, closeN) {
    // base case - open ==n close === n
    if (openN === n && closeN === n) {
      // push current stack to result array
      res.push(stack.join(""));
      return;
    }

    // only add open paren if openN < n
    if (openN < n) {
      stack.push("(");
      // call recursive function incrementing number of open parens
      backtrack(openN + 1, closeN);
      // clean up
      stack.pop();
    }

    // only add close paren if closeN < openN
    if (closeN < openN) {
      stack.push(")");
      // call recursive function incrementing number of close parens
      backtrack(openN, closeN + 1);
      // clean up
      stack.pop();
    }
  }

  backtrack(0, 0);
  return res;
};

/**
 * Loose upperbound on time complexity is 2^2n (equivalent ot 4^n)
 *
 * Reasoning: binary sequence of length 2n. "(" is mapped to 0, and ")" is mapped to 1,
 * so total number of binary sequences of length 2n will be 2^2n. Backtracking approach
 * will trim some of those binary sequences, so will be slightly better than 2^2n.
 */
