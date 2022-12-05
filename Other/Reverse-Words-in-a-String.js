/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s
    .split(" ")
    .filter((str) => str !== "")
    .reverse()
    .join(" ");
};

// Time: O(N)
// Space: O(N)
