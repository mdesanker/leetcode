/**
 * @param {string} s
 * @return {boolean}
 */

const isValid = function (s) {
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

/*
Time: O(N)
Space: O(N)
*/
