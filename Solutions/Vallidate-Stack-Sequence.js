/**
Solution - Stack
 */
var validateStackSequences = function (pushed, popped) {
  const n = pushed.length;
  const stack = [];
  let p1 = 0,
    p2 = 0;
  while (p2 < n) {
    if (!stack.length || (stack[stack.length - 1] !== popped[p2] && p1 < n)) {
      stack.push(pushed[p1]);
      p1++;
    } else if (stack[stack.length - 1] === popped[p2] && p2 < n) {
      stack.pop();
      p2++;
    } else return false;
  }
  return true;
};
// TC: O(n)
// SC: O(n)
