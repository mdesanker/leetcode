/**
Solution: Stack
 */
var backspaceCompare = function (s, t) {
  function process(string) {
    let stack = [];
    for (let char of string) {
      if (char === "#") stack.pop();
      else stack.push(char);
    }
    return stack.join("");
  }
  return process(s) === process(t);
};
// TC: O(n)
// SC: O(n)
