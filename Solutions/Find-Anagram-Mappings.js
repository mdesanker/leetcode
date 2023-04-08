/**
Solution: Hash map

Map each num in nums2 to an array of indexes it appears at
To build result, iterate through nums1, and push the index at which that num appears into res array

n = nums1.length = nums2.length
TC: O(n)
SC: O(n)
 */
var anagramMappings = function (nums1, nums2) {
  const map = {};
  for (let i = 0; i < nums2.length; i++) {
    const num = nums2[i];
    map[num] ? map[num].push(i) : (map[num] = [i]);
  }

  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    const num = nums1[i];
    res.push(map[num].pop());
  }
  return res;
};
// TC: O(n)
// SC: O(n)
