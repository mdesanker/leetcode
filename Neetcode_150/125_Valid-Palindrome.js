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
