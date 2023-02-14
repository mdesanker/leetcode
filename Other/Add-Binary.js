/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function (a, b) {
  // We use 0b prefix to show that the given string should be treated as a binary number
  // this is parsed as BigInt, the constraints provided show that the numbers could be outside the range
  // of 32 bit integers (unless used BigInt on both sides, bitwise operators treat their operands as 32 bit integers)

  let sum = BigInt(`0b${a}`);
  let carry = BigInt(`0b${b}`);

  // repeatedly sum the numbers (a ^ b is the result of sum)
  // (and carry is always (a & b) << 1) while carry is not zero

  while (carry > 0) {
    let temp = sum ^ carry;

    // 1n casts 1 as a BigInt number
    carry = (sum & carry) << 1n;
    sum = temp;
  }

  // convert BitInt back to binary string
  return sum.toString(2);
};

// Time: O(n + m) where n and m are lengths of string a and b
// Space: O(max(n, m)) to hold the answer
