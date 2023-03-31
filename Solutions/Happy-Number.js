/**
 * @param {number} n
 * @return {boolean}
 */

const isHappy = function (n) {
  // helper function to get sum of squares of digits of a number
  const sumSquares = function (num) {
    let res = 0;
    while (num > 0) {
      // get last digit of num
      const digit = num % 10;
      res += digit ** 2;
      // remove last digit from num
      num = Math.floor(num / 10);
    }
    return res;
  };

  let slow = n,
    fast = n;

  while (true) {
    slow = sumSquares(slow);
    fast = sumSquares(sumSquares(fast));

    // return when loop found
    if (slow === fast) {
      // happy if numbers reduced to 1
      return slow === 1;
    }
  }
};

/*
Time: O(logN)
Space: O(1)
*/
