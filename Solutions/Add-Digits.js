/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  while (num > 9) {
    const digits = num.toString().split("");
    num = digits.reduce((a, b) => Number(a) + Number(b));
  }
  return num;
};
// n = num.length
// TC: O(n)
// SC: O(n)

/**
Identify pattern by writing a few cases
1=1; 2=2; 3=3; 4=4; 5=5; 6=6; 7=7; 8=8; 9=9;
10=1; 11=2; 12=3; 13=4; 14=5; 15=6; 16=7; 17=8; 18=9;
19=1; 20=2; 21=3; 22=4; 23=5; 24=6; 25=7; 26=8; 27=9;
*/
var addDigits = function (num) {
  if (num === 0) return 0;
  else {
    if (num % 9 === 0) return 9;
    else return num % 9;
  }
};
// n = num.length
// TC: O(1)
// SC: O(1)
