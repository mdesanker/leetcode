/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const stack = [];

  for (let char of s) {
    if (map.hasOwnProperty(char)) {
      if (stack[stack.length - 1] === map[char]) stack.pop();
      else return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
};

// Time: O(n)
// Space: O(n)

/** 
Build hashmap with closing parentheses as keys and corresponding openening parentheses as values
Initialize empty array to be used as a stack.

Iterate through string
If hash has char as a key, we have found a closing parenthesis - need to check if it pairs with the last opening paren in the stack
If the last element in the stack === the value of the closing parenthesis in the hash, then we have successfully closed the last paren
The last element can be popped from the stack
If the last element is not the correct opening paren for the current closing paren, then return false immediately.

If we find an opening paren, then push to stack

If we successfully paired off all parens, then length of stack will be 0. 
Return whether the length of stack === 0 in case there are remaining open parens
*/

const isValid2 = function (s) {
  const stack = [],
    map = {
      "}": "{",
      "]": "[",
      ")": "(",
    };

  for (let i = 0; i < s.length; i++) {
    // check if we are at a closing parentheses
    if (!map.hasOwnProperty(s[i])) {
      // if not, add to stack
      stack.push(s[i]);
    } else {
      // at closing, check if last element in stack === the opening parentheses
      if (map[s[i]] === stack[stack.length - 1]) {
        // it matches, remove from stack
        stack.pop();
      } else {
        // doesn't match
        return false;
      }
    }
  }
  return stack.length === 0;
};
