/**
Solution: Hash map
 */
var canConstruct = function (ransomNote, magazine) {
  const map = {};
  for (let char of magazine) map[char] = map[char] + 1 || 1;

  for (let char of ransomNote) {
    if (!map.hasOwnProperty(char)) return false;
    else {
      map[char]--;
      if (map[char] === 0) delete map[char];
    }
  }
  return true;
};
// TC: O(n)
// SC: O(n)
