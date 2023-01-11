/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  while (b !== 0) {
    // and takes care of carries (must be bitshifted to the left 1 space)
    // use tmp variable because a is modified in following line
    let tmp = (a & b) << 1;
    // xor takes care of adding two numbers
    a = a ^ b;
    b = tmp;
  }
  return a;
};

// Time: O(1) because a and b are bounded
// Space: O(1)
