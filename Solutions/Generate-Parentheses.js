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

/** 
For well formed parens, the number of open parens will equal the number of closed parens will equal n.
Use backtracking because we want to find all possible combinations.
Track number of open and closed parens as parameters.

Base case: if we have n open parens and n closed parens, then push the curr combination as a string onto result array

Recursive cases:
If open parens is less than n, we can add another open parens
Push open paren onto curr, call backtracking function again incrementing open count by 1, then pop this paren from curr

If closed parens is less than open parens, we can add another closed parens
Push closed parens onto curr, call backtracking function again incrementing closed count by 1, the pop this paren from curr

TC: O(2^2n)
SC: O(2^2n)
*/
