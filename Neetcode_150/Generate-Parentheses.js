/**
 * @param {number} n
 * @return {string[]}
 */

const generateParentheses = function (n) {
  const res = [],
    stack = [];

  function backtract(openN, closeN) {
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
