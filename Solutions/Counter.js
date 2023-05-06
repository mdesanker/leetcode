/**
 * @param {number} n
 * @return {Function} counter
 */
// Increment then return
var createCounter = function (n) {
  let count = 0;
  return function () {
    return n + count++;
  };
};

// Postfix increment
var createCounter = function (n) {
  return () => n++;
};

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
