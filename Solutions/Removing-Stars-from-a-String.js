/**
Solution: Stack

Add chars to stack, every time encounter a star, pop from stack
 */
var removeStars = function (s) {
  const stack = [];
  for (let char of s) {
    if (char === "*") stack.pop();
    else stack.push(char);
  }
  return stack.join("");
};
// TC: O(n)
// SC: O(n)
