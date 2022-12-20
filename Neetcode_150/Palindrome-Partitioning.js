/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const res = [];
  const curr = [];

  // palindrome helper function
  function isPalindrome(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  // i is the index of char currently at
  function dfs(i) {
    // base case: i outside range
    if (i >= s.length) {
      res.push(curr.slice());
      return;
    }

    for (let j = i; j < s.length; j++) {
      // check if current substring is a palindrome
      if (isPalindrome(i, j)) {
        // add current substring to curr
        curr.push(s.slice(i, j + 1));
        // dfs on remainder of string
        dfs(j + 1);
        // backtrack
        curr.pop();
      }
    }
  }

  dfs(0);
  return res;
};

// Time: O(n * 2^n)
// Space: O(n)
