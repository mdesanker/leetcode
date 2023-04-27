/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const mapst = {};
  const mapts = {};

  for (let i = 0; i < s.length; i++) {
    const c1 = s[i],
      c2 = t[i];
    if (!mapst.hasOwnProperty(c1) && !mapts.hasOwnProperty(c2)) {
      mapst[c1] = c2;
      mapts[c2] = c1;
    } else if (mapst[c1] !== c2 || mapts[c2] !== c1) return false;
  }
  return true;
};
// TC: O(n)
// SC: O(n)
