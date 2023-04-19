/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  const n = secret.length;
  const map = {};
  for (let char of secret) map[char] = map[char] + 1 || 1;

  let bulls = 0,
    cows = 0;
  for (let i = 0; i < n; i++) {
    // chars match
    if (secret[i] === guess[i]) {
      // if we already counted char as a cow, must remove the cow
      if (map[guess[i]] <= 0) {
        cows--;
        map[guess[i]]++;
      }
      // increment bull and decrement count
      bulls++;
      map[guess[i]]--;
      // char exists in map and freq is not 0
    } else if (map.hasOwnProperty(guess[i]) && map[guess[i]] > 0) {
      cows++;
      map[guess[i]]--;
    }
  }
  return `${bulls}A${cows}B`;
};
// TC: O(n)
// SC: O(n)
