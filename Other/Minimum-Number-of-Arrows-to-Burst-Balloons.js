/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  // sort by end point
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  // get end point of first balloon
  let firstEnd = points[0][1];

  for (let [xStart, xEnd] of points) {
    // if current ballow starts after end of the next one,
    // needs one more arrow
    if (firstEnd < xStart) {
      arrows++;
      // update endpoint for new balloon
      firstEnd = xEnd;
    }
  }
  return arrows;
};

// array.length < 10:
// Time: O(n^2)
// Space: O(1)

// array.length > 10:
// Time: O(nlogn)
// Space: O(logn)
