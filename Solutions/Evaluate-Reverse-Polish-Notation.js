/**
 * @param {string[]} tokens
 * @return {number}
 */

const evalRPN = function (tokens) {
  const stack = [];

  for (let char of tokens) {
    if (char === "+") {
      stack.push(stack.pop() + stack.pop());
    } else if (char === "-") {
      let a = stack.pop(),
        b = stack.pop();
      stack.push(b - a);
    } else if (char === "*") {
      stack.push(stack.pop() * stack.pop());
    } else if (char === "/") {
      let a = stack.pop(),
        b = stack.pop();
      stack.push(Math.trunc(b / a));
    } else {
      stack.push(Number(char));
    }
  }

  return stack[0];
};

// Time: O(N)
// Space: O(N)

/** 
In RPN, the opperands precede the operators, so we will use a stack to keep track of the operands (numbers) and whenever we encounter
an operator, we will perform the operation on the last two numbers in the stack.
The result will be the only value left in the stack after the tokens array has been fully traversed.

Iterate through every char in tokens array
Use if/elseif blocks to check for every operator.
Addition: pop last two values, add, and push
Subtraction: subtract second popped value from first popped value
Multiplication: multiply last two popped values
Division: Question statement says division always truncates towards zero, so use Math.trunc function for division
divide second popped value from first popped value

If char is not an operand, convert to number and push to stack

Return the only char left in the stack

TC: O(n) iterate through the tokens array once
SC: O(n) worst case, the stack will have all the numbers on it at the same time. This will never be more than half the length of the input array
*/
