/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  const size = flowerbed.length;
  let count = 0;
  for (let i = 0; i < size; i++) {
    let prev = (next = 0);
    if (i > 0) prev = flowerbed[i - 1];
    if (i < size - 1) next = flowerbed[i + 1];

    if (flowerbed[i] === 0 && prev === 0 && next === 0) {
      count++;
      i++;
    }
    if (count >= n) return true;
  }
  return false;
};

// Time: O(n)
// Space: O(1)
