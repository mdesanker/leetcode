/**
Solution: Hash map

Key insight is you don't have to use every single available char
Use even amount of every char, then if there are any odd counts, add 1
 */
var longestPalindrome = function (s) {
  const map = new Map();
  for (let char of s) map.set(char, map.get(char) + 1 || 1);
  let res = 0;
  for (let [char, count] of map) {
    // use max even number of each count
    res += Math.floor(count / 2) * 2;
    // if current res length is even, and we have an odd count, we can include a single center element
    if (res % 2 === 0 && count % 2 === 1) res++;
  }
  return res;
};
// TC: O(n)
// SC: O(26) = O(1)
