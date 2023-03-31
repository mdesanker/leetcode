/**
Solution: Sliding window, hash map

Initialize l pointer at beginning, then loop through every element with for-loop for r pointer
Store last occurence of an element in hash
If we encounter an element that is already in the hash map, move left pointer to max of itself and 1 + index of last occurence
l = Math.max(l, hash[rChar] + 1);
This is incase the last occurence of this char happens outside the current window

As we traverse string, add rChar and their index to hash

At each step check max length

n = s.length
TC: O(n)
SC: O(1)
 */
const lengthOfLongestSubstring = function (s) {
  let start = 0,
    length = 0,
    charMap = {};

  // extend sliding window
  for (let end = 0; end < s.length; end++) {
    let rightChar = s[end];

    // if rightChar in map, jump window forward
    if (rightChar in charMap) {
      start = Math.max(start, charMap[rightChar] + 1);
    }

    // add rightChar to map
    charMap[rightChar] = end;

    // store max length
    length = Math.max(length, end - start + 1);
  }
  return length;
};
