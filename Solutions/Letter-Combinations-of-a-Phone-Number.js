/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const res = [];
  const digitToChar = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // i = digit at in input string
  function backtrack(i, curr) {
    // base case: curr string has a letter for every digit
    if (curr.length === digits.length) {
      res.push(curr);
      return;
    }

    // brute force backtrack for every possible char for digits[i]
    for (const char of digitToChar[digits[i]]) {
      // increment index and add current char to current string
      backtrack(i + 1, curr + char);
    }
  }
  // check digits isn't empty so don't add empty strings to array
  if (digits.length) {
    backtrack(0, "");
  }
  return res;
};

// Time: O(n * 4^n)
// Space: O(n)

/**
Need to create a map of digits to characters - digitToChar

Backtrack function:
Parameters:
i index pointer so we know position in digits
curr so we know the current combination

Base case:
Every digit will map to one letter at a time, so when we are at the end of digits string, we will have finished a combination
Push a copy of curr to res and return

Recursive case:
We will get the string of possible chars for the current digit being considered, and iterate through them, adding them to curr and calling backtrack

We will only call backtrack function if digits array is not empty
Call it at index 0 of digits, and with an empty string to initialize curr

TC: O(n * 4^n) for every digit, we have up to 4 letters to choose from (for 7 and 9), 4 choices for n digits is 4^n. 
  It takes n time to build each string
SC: O(n) linear space needed to build the curr string. Recursive stack also needs O(n) space because there is a recursive call for every digit
 */
