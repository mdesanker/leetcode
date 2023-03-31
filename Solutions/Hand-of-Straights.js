/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  // make first group with minimum value

  // edge case: number of cards must be divisible by groupSize
  if (hand.length % groupSize) return false;

  // sort hand
  hand.sort((a, b) => a - b);

  const charMap = new Map();
  for (let card of hand) charMap.set(card, charMap.get(card) + 1 || 1);

  while (charMap.size) {
    // get first key in charMap
    const first = charMap.keys().next().value;
    // iterate through groupSize and delete chars from charMap
    for (let i = first; i < first + groupSize; i++) {
      // if key not in charMap immediately return false
      if (!charMap.has(i)) return false;

      // if freq of char === 1, delete from map, else decrement count
      const freq = charMap.get(i);
      if (freq === 1) charMap.delete(i);
      else charMap.set(i, charMap.get(i) - 1);
    }
  }
  return true;
};

// Time: O(nlogn) potentially pop n times from minheap where n = hand.length
// Space: O(1)
