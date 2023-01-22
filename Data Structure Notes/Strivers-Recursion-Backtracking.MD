# 2. Basic Recursion Problems

Print linearly from 1 to N

```js
function printNums(i, n) {
  if (i > n) return;

  console.log(i);

  printNums(i + 1, n);
}

printNums(1, 4);
// 1
// 2
// 3
// 4
```

# 3. Parametric vs Functional

Parametric - the result is stored in a parameter
Functional - a function returns the result

Sum numbers up to N:

```js
// parameterized - sum is stored in params
function sumNums(i, sum) {
  if (i < 1) {
    console.log(sum);
    return;
  }

  sumNums(i - 1, sum + i);
}
// sumNums(3, 0);

// functional - function returns sum
function sumNums2(n) {
  if (n === 0) return 0;
  return n + sumNums2(n - 1);
}

// console.log(sumNums2(3))

// Factorial

// parameterized

function factorialPar(i, res) {
  if (i < 1) {
    console.log(res);
    return;
  }

  factorialPar(i - 1, res * i);
}

// factorialPar(4, 1);

// functional
function factorialFun(n) {
  if (n === 1) return 1;
  return n * factorialFun(n - 1);
}

console.log(factorialFun(4));
```

# 4. Problems on Functional Recursion

Reverse an array

```js
// Reverse an array
// [1, 2, 3, 4, 2] --> [2, 4, 3, 2, 1]

// for loop
function reverseArr(arr) {
  let l = 0,
    r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++;
    r--;
  }
  return arr;
}

console.log(reverseArr([1, 2, 3, 4, 2]));

// recursion
function reverseArrRec(arr) {
  let l = 0,
    r = arr.length - 1;

  function swap(l, r) {
    // base case
    if (l >= r) {
      console.log(arr);
      return;
    }

    // swap l and r pointers
    [arr[l], arr[r]] = [arr[r], arr[l]];

    // increment pointers and call swap
    swap(l + 1, r - 1);
  }

  return swap(l, r);
}

reverseArrRec([1, 2, 3, 4, 2]);

// single pointer
function reverseSingle(arr) {
  function swap(i) {
    if (i >= arr.length - i - 1) {
      console.log(arr);
      return;
    }

    [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];

    swap(i + 1);
  }
  swap(0);
}

reverseSingle([1, 2, 3, 4, 2]);
```

Check if valid palindrome

```js
// Check if string is a palindrome
// 'abc' -> false
// 'abba' -> true

const str1 = "madam"; // true
const str2 = "abcdef"; // false

function isPalindrome(s) {
  let l = 0,
    r = s.length - 1;

  while (l < r) {
    if (s[l] !== s[r]) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}

// console.log(isPalindrome(str1));
// console.log(isPalindrome(str2));

// recursion
function isPalindromeRec(str) {
  // base case
  // if no str remaining, it is a palindrome
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;

  // if first and last char are equal, shrink str and check if palindrome
  return isPalindromeRec(str.slice(1, -1));
}

console.log(isPalindromeRec(str1));
console.log(isPalindromeRec(str2));

function isPalindromeRec2(str, i) {
  // base cases
  // if i reaches middle of str, then it is a palindrome
  if (i >= str.length / 2) return true;
  if (str[i] !== str[str.length - i - 1]) return false;

  return isPalindromeRec2(str, i + 1);
}

console.log(isPalindromeRec2(str1, 0));
console.log(isPalindromeRec2(str2, 0));
```

# 5. Multiple Recursion Calls

Fibonnaci Number

```js
function fib(n) {
  if (n <= 1) return n;

  return fib(n - 1) + fib(n - 2);
}

// Time: O(2^n) two recursive calls for every level of the tree
// Space: O(h) one recursive stack at a time, that can be the height of the tree

console.log(fib(4));
console.log(fib(8));
```
