/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  function validIPv4(queryIP) {
    const arr = queryIP.split(".");

    if (arr.length !== 4) return false;

    for (let str of arr) {
      const num = parseInt(str);
      if (num < 0 || num > 255) return false;
      if (num.toString() !== str) return false;
    }
    return true;
  }

  function validIPv6(queryIP) {
    const arr = queryIP.split(":");

    if (arr.length !== 8) return false;

    const valid = "0123456789abcdefABCDEF";

    for (let str of arr) {
      if (str === "" || str.length > 4) return false;
      for (let c of str) {
        if (!valid.includes(c)) return false;
      }
    }
    return true;
  }

  if (validIPv4(queryIP)) {
    return "IPv4";
  }
  if (validIPv6(queryIP)) {
    return "IPv6";
  }
  return "Neither";
};

// Time: O(n)
// Space: O(n)
