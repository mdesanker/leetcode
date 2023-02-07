/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  let l = 0,
    length = 0;
  // map will store frequencies of fruits so we can track how many different types of fruits are we have
  const map = new Map();

  for (let r = 0; r < fruits.length; r++) {
    // add right fruit to basket
    map.set(fruits[r], map.get(fruits[r]) + 1 || 1);

    // if we have more than 2 types of fruit in baskets, we need to increment left pointer
    if (map.size > 2) {
      // decrement the freq of left fruit
      map.set(fruits[l], map.get(fruits[l]) - 1);
      // if freq is 0, remove from basket
      if (map.get(fruits[l]) === 0) map.delete(fruits[l]);
      // increment left pointer
      l++;
    }
    // check against max length
    length = Math.max(length, r - l + 1);
  }
  return length;
};

// Time: O(n) we iterate through fruits array once
// Space: O(1) map will hold at most 3 different types of fruit
