/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function (coordinates) {
  const n = coordinates.length;

  function getSlope(first, second) {
    return Math.abs((second[1] - first[1]) / (second[0] - first[0]));
  }

  const slope = getSlope(coordinates[0], coordinates[1]);

  for (let i = 0; i < n; i++) {
    const first = coordinates[i];
    for (let j = i + 1; j < n; j++) {
      const second = coordinates[j];

      const currSlope = getSlope(first, second);
      if (currSlope !== slope) return false;
    }
  }
  return true;
};

var checkStraightLine = function (coordinates) {
  const n = coordinates.length;

  function getSlope(first, second) {
    return (second[1] - first[1]) / (second[0] - first[0]);
  }

  const slope = getSlope(coordinates[0], coordinates[1]);
  let vertical = Math.abs(slope) === Infinity;

  for (let i = 2; i < n; i++) {
    // handle vertical edge case
    if (coordinates[i][0] === coordinates[0][0]) {
      if (vertical) continue;
      else return false;
    }
    if (slope !== getSlope(coordinates[0], coordinates[i])) return false;
  }
  return true;
};
// TC: O(n)
// SC: O(1)
