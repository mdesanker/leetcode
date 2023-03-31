/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const res = [];

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
  function backtrack(ind, curr) {
    // base case: i outside range
    if (ind >= s.length) {
      res.push(curr.slice());
      return;
    }

    for (let i = ind; i < s.length; i++) {
      // check if current substring is a palindrome
      if (isPalindrome(ind, i)) {
        // add current substring to curr
        curr.push(s.slice(ind, i + 1));
        // dfs on remainder of string
        backtrack(i + 1);
        // backtrack
        curr.pop();
      }
    }
  }

  backtrack(0, []);
  return res;
};

// Time: O(n * 2^n)
// Space: O(n)

/**
We will split the string into partitions that are palindromes. Single letters can be considered a palindrome.

Is Palindrome Helper function
Basic check if a string is a palindrome
Two pointers, beginning and end of string
Move pointers inward, while checking that the chars are equivalent at every step

Backtrack function:
Parameters:
ind the index we are currently at in the string
curr the curr collection of palindromes

Base case: 
We need to include every element in the string, so once our pointer reaches the end of the string, we know we are done with this combination
Push a copy of curr onto res array and return

Recursive cases:
Loop from ind  through the rest of the arr
We will check if the substring created by the window from ind to i is a palindrome
If it is a palindrome, we can push the substring onto curr and call backtracking function with updated pointer
Then we pop the most recent palindrome from curr to clear

Call backtracking function starting at index 0 and with empty array for curr

TC: O(n * 2^n) in worst case scenario, there are 2^n possible substrings (s = "aaa"). It takes O(n) time to generate the substring and
determine if it is a palindrome or not
SC: O(n) curr array will be the length of the string. Maximum depth of recursive stack will be equal to n for s = "aaa"
 */
