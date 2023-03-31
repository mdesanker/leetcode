/**
 * @param {string} s
 * @return {boolean}
 */

const isPalindrome = function (s) {
  let start = 0,
    end = s.length - 1;

  while (start < end) {
    // if pointer at an element that isn't alphanumeric, keep going
    while (start < end && !s[start].match(/[a-z0-9]/i)) {
      start++;
    }
    while (start < end && !s[end].match(/[a-z0-9]/i)) {
      end--;
    }

    // if elements converted to lowercase aren't equal, return false
    if (s[start].toLowerCase() !== s[end].toLowerCase()) {
      return false;
    }
    start++;
    end--;
  }

  return true;
};

/*
Time: O(N)
Space: O(1)
*/

/**
Initialize a pointer to the beginning (l) and end (r) of the string.
While l pointer is less than r pointer, check if the character at each pointer converted to lower case is equal.
If not equal, the not a palindrome, so return false immediately.
If equal, increment l pointer and decrement r pointer to check next pair of characters.

Want to skip all non-alphanumeric characters so use regex matching to check if each char is alphanumeric. 
If a char is not alphanumeric, and that pointer is not out of bounds (l < r) then increment that pointer only.

TC: O(n) iterate through string once
SC: Only memory is two variables to track the position of l and r pointers
 */
