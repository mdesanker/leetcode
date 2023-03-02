/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  let l = 0,
    r = 0;
  while (r < chars.length) {
    chars[l] = chars[r];
    let count = 1;

    while (r + 1 < chars.length && chars[r] === chars[r + 1]) {
      r++;
      count++;
    }

    if (count > 1) {
      for (let c of count.toString()) {
        chars[l + 1] = c;
        l++;
      }
    }

    l++;
    r++;
  }
  return l;
};

// Time: O(n)
// Space: O(1)

var compress = function (chars) {
  const n = chars.length;
  let s = "";
  let curr = chars[0],
    count = 0;
  for (let i = 0; i < n; i++) {
    if (chars[i] !== curr) {
      chars.push(curr);
      if (count > 1) chars.push(...count.toString().split(""));
      curr = chars[i];
      count = 1;
    } else {
      count++;
    }
  }
  chars.push(curr);
  if (count > 1) chars.push(...count.toString().split(""));
  chars.splice(0, n);
  return chars.length;
};
