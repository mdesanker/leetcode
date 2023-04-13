/**
Solution: Stack
 */
var simplifyPath = function (path) {
  const parts = path.split("/");
  let stack = [];
  for (let char of parts) {
    if (char === "" || char === ".") continue;
    else if (char === "..") stack.pop();
    else stack.push(char);
  }
  return `/${stack.join("/")}`;
};
// TC: O(n)
// SC: O(n)
