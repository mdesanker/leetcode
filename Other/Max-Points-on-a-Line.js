// https://leetcode.com/problems/max-points-on-a-line/solutions/1179399/javascript-beats-92-easy-to-follow/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  // if less than 2 points, all points are only the line
  if (points.length < 3) return points.length;

  let maxLine = 0;

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function slope(p1, p2) {
    let xDiff = p1[0] - p2[0];
    let yDiff = p1[1] - p2[1];

    if (xDiff === 0) return "vertical";
    if (yDiff === 0) return "horizontal";

    const div = gcd(xDiff, yDiff);
    xDiff /= div;
    yDiff /= div;

    return xDiff + "/" + yDiff;
  }

  for (let i = 0; i < points.length; i++) {
    // Reset each outer loop to avoid double counting parallel slopes
    const slopes = {};
    for (let j = i + 1; j < points.length; j++) {
      const currSlope = slope(points[i], points[j]);

      // If curSlope doesn't exist, that means we need to initialize to 2 points
      // since we can't have a slope with only one point
      slopes[currSlope] = slopes[currSlope] + 1 || 2;
      maxLine = Math.max(maxLine, slopes[currSlope]);
    }
  }
  return maxLine;
};

// Time: O(n^2)
// Space: O(n)
