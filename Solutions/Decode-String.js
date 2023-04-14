/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];
  for (let char of s) {
    if (char !== "]") {
      stack.push(char);
    } else {
      let curr = "";
      while (stack[stack.length - 1] !== "[") {
        curr = stack.pop() + curr;
      }
      stack.pop(); // remove "["
      let count = "";
      while (stack.length > 0 && stack[stack.length - 1].match(/[0-9]/i)) {
        count = stack.pop() + count;
      }
      stack.push(curr.repeat(count));
    }
  }
  return stack.join("");
};
// maxK = maximum k value, an countK is number of nested k values
// TC: O(maxK^countK * n)
// SC: O(sum(maxK^countK * n))
