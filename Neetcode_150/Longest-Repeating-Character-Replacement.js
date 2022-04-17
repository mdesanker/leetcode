/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

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

/*
Time: O(N)
Space: O(1) - fixed number of chars in input str (26)
*/