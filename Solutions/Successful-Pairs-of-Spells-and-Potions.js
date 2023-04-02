/**
Solution: Sort and Binary Search

Sort potions array, this way binary search can be used for every spell to find minimum index where successful combination can be made
Binary search on every spell, and subtract from length of potions array to get number of pairs for each spell

n = spells.length, m = potions.length
TC: O((n + m)logm) O(mlogm) to sort potions array, binary search for every spell on potions array O(nlogm)
SC: O(1)
 */
// Brute force [TLE]
var successfulPairs = function (spells, potions, success) {
  const n = spells.length,
    m = potions.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < m; j++) {
      if (spells[i] * potions[j] >= success) count++;
    }
    res.push(count);
  }
  return res;
};
// n = spells.length, m = potions.length
// TC: O(nm)
// SC: O(1)

// Binary Search
var successfulPairs = function (spells, potions, success) {
  const n = potions.length;
  potions.sort((a, b) => a - b);

  const res = [];
  for (let spell of spells) {
    const ind = bs(spell);
    res.push(n - ind);
  }
  return res;

  function bs(spell) {
    let l = 0;
    r = potions.length - 1;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      if (spell * potions[mid] >= success) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return spell * potions[l] >= success ? l : n;
  }
};
// n = spells.length, m = potions.length
// TC: O((n + m)logm) O(mlogm) to sort potions array, binary search for every spell on potions array O(nlogm)
// SC: O(1)
