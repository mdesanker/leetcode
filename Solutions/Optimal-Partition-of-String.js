/**
Solution: Greedy

Use a pointer to mark the beginning of the current partition where there are no duplicate characters.
Store last occurrence of every character in an array
When you encounter a duplicate in the current window, increase count and update start point

n = s.length
TC: O(26) + O(n)
SC: O(26)
 */
var partitionString = function (s) {
  let count = 1;
  const chars = new Array(26).fill(-1);
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    const ind = s[i].charCodeAt() - "a".charCodeAt();
    if (chars[ind] >= start) {
      count++;
      start = i;
    }
    chars[ind] = i;
  }
  return count;
};
// TC: O(n)
// SC: O(26) = O(1) if limited to english lowercase letters
