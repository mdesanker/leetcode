var DetectSquares = function () {
  this.points = new Map();
};

/**
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function (point) {
  // store key as variable
  const key = `${point[0]}#${point[1]}`;
  // saved point = existing point or new point which is object with keys of coords and count
  const savedPoint = this.points.has(key)
    ? this.points.get(key)
    : { x: point[0], y: point[1], count: 0 };
  // increment count
  savedPoint.count = savedPoint.count + 1;
  // store/overwrite point
  this.points.set(key, savedPoint);
};

// Time: O(1)
// Space: O(n)

/**
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function (point) {
  let count = 0;

  for (let diagPoint of this.points.values()) {
    // not diagonal if have same x or y value
    // difference between x and y values must not be 0 because need space to build square
    if (diagPoint.x === point[0] || diagPoint.y === point[1]) continue;

    // diagonal but don't form square
    if (Math.abs(diagPoint.x - point[0]) !== Math.abs(diagPoint.y - point[1]))
      continue;

    // form square, check for corners
    const point1 = this.points.get(`${diagPoint.x}#${point[1]}`);
    const point2 = this.points.get(`${point[0]}#${diagPoint.y}`);

    // corners are missing
    if (!point1 || !point2) continue;

    // multiply by count of each point for duplicates
    count = count + point1.count * point2.count * diagPoint.count;
  }
  return count;
};

// Time: O(n)
// Space: O(n)

/**
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */

/**
 * 1. Check if two points can form the diagonal of a square (x difference and y difference of coordinates are equal)
 *    Time: O(n) to iterate through points to find the diagonal point
 * 2. Check if two other coordinates exist instore (check if [x1, y2] and [x2, y1] exist) and multiply counts of each point
 */

/**
 * Brute Force
 * Time: O(n^3)
 */
