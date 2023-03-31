/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const sArray = s.split(" ");
  const pArray = pattern.split("");

  if (sArray.length !== pArray.length) return false;

  // map pattern letters to words in string s
  const charMap = {};

  for (let i = 0; i < sArray.length; i++) {
    // if pattern letter not already a key and the value word s doesn't already exist in values array
    if (
      !charMap.hasOwnProperty(pArray[i]) &&
      !Object.values(charMap).includes(sArray[i])
    ) {
      charMap[pArray[i]] = sArray[i];
    } else {
      if (charMap[pArray[i]] !== sArray[i]) return false;
    }
  }
  return true;
};

// Time: O(n) n time for split operations and n time to iterate through array
// Space: O(n) n space for charMap
