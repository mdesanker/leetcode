/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// While loop implementation
var characterReplacement = function (s, k) {
  let left = 0,
    right = 0,
    max = 0,
    mostFreq = 0;
  const charMap = {};

  while (right < s.length) {
    const rightChar = s[right];
    // add to charMap
    charMap[rightChar] = (charMap[rightChar] || 0) + 1;

    // check most freq
    mostFreq = Math.max(mostFreq, charMap[rightChar]);

    // if mostFreq > k, then move left pointer
    if (right - left + 1 - mostFreq > k) {
      const leftChar = s[left];
      charMap[leftChar]--;
      left++;
    }
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};

// Time: O(n)
// Space: O(n)

/** 
Sliding window technique, so initialize l and r pointer at begining of string. 
Will need to track mostFreq char so we know if remaining number of chars is less than k and can be swapped.
Hashmap will be used to track the characters in the window and their frequency

While r pointer is less than length of string
Add rightChar to the hashmap or increment its count.
Check if there is a new mostFreq char

Check if sliding window needs to be shrunk: if the length of the sliding window minus freq of mostFreq char is greater than k

e.g. k = 1, s = "AABA"
mostFreq = 3 (char "A");
length = r - l + 1 = 4
r - l + 1 - mostFreq = 4 - 3 === k
This sliding window is valid

e.g. k = 1, s = "AABAB"
mostFreq = 3 (char "A")
length = r - l + 1 = 5
r - l + 1 - mostFreq = 5 - 3 > k
This sliding window requires too many swaps to be valid, therefore l pointer will need to be moved

To shrink sliding window, decrement freq of leftChar and increment l pointer;

At this point, we know we have a valid window, check if it is a new max length;
Increment r pointer before end of loop.

TC: O(n) traverse string array once
SC: O(n) hashmap could have to hold n different characters if every character in the string is unique. 
This is limited to 26 (letters in alphabet), so is technically O(1)
*/

// For loop implementation
const characterReplacement = function (s, k) {
  let left = 0,
    max = 0,
    mostFreq = 0;
  const freqMap = {};

  for (let right = 0; right < s.length; right++) {
    let rightChar = s[right];

    // add new char to freqMap
    freqMap[rightChar] ? freqMap[rightChar]++ : (freqMap[rightChar] = 1);

    mostFreq = Math.max(mostFreq, freqMap[rightChar]);

    // if window length - mostFreq is greater than k, we have exceeded operation limit to make current window a valid string
    while (right - left + 1 - mostFreq > k) {
      let leftChar = s[left];
      freqMap[leftChar]--;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
};
