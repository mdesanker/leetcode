// https://leetcode.com/problems/multiply-strings/solutions/671503/the-most-voted-java-solution-rewritten-in-javascript-with-graph-explanation/?orderBy=most_votes&languageTags=javascript

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  // if either num is 0, retturn 0
  if (num1 === "0" || num2 === "0") return "0";

  let m = num1.length,
    n = num2.length;

  // longest possible answer is length of m + n
  const res = new Array(m + n).fill(0);

  // iterate through both numbers backwards
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // p1 = tens digit, p2 = ones digit
      const p1 = i + j,
        p2 = i + j + 1;
      // add product to current value in ones digit position
      let sum = res[p2] + Number(num1[i]) * Number(num2[j]);
      // handle carry
      res[p2] = sum % 10;
      res[p1] += Math.floor(sum / 10);
    }
  }
  // remove leading 0s from result
  while (res[0] === 0) res.shift();
  return res.join("");
};

// Time: O(n * m)
// Space: O(n + m)
