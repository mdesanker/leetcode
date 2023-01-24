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

# 6. Recursion on Subsequences

```js
// print all subsequences
// [3, 1, 2] -> [[3], [1], [2], [3, 1], [3, 2], [1, 2], [3, 1, 2]]

const arr = [3, 1, 2];

function subsequences(nums) {
  const res = [];
  const curr = [];

  function backtrack(i) {
    if (i >= nums.length) {
      res.push(curr.slice());
      return;
    }

    // case: take nums[i]
    curr.push(nums[i]);
    backtrack(i + 1);
    // case: not take nums[i]
    curr.pop();
    backtrack(i + 1);
  }
  backtrack(0);
  return res;
}

// Time: O(n * 2^n) 2 options for every index (n) and multiplied by n for length of subsequence
// Space: O(h)

console.log(subsequences(arr));
```

# 7. All Kinds of Patterns in Recursion

```js
// Subsequences whose sum is k

const arr = [1, 2, 1];

function subsequence(nums, k) {
  function dfs(i, curr, total) {
    // base case
    // reached end of nums and total = k, then found valid susbequence
    if (i >= nums.length) {
      if (total === k) {
        console.log(curr);
      }
      return;
    }

    // take
    curr.push(nums[i]);
    dfs(i + 1, curr, total + nums[i]);
    // not take
    curr.pop();
    dfs(i + 1, curr, total);
  }
  return dfs(0, [], 0);
}

// subsequence(arr, 2);

// Print any subsequence whose sum is k

// If able to generate a subsequence that meets requirement, return true. Else return false.

// base case
// if valid return true;
// else return false;

// add(value)
// if (f() === true) return true;
// remove(value)
// if (f() === true) return true;

// return false;

function printSubs(nums, k) {
  function dfs(i, curr, total) {
    // base case
    if (i >= nums.length) {
      if (total === k) {
        console.log(curr);
        return true;
      }
      return false;
    }

    curr.push(nums[i]);
    if (dfs(i + 1, curr, total + nums[i])) {
      return true;
    }
    curr.pop();
    if (dfs(i + 1, curr, total)) {
      return true;
    }
    return false;
  }
  return dfs(0, [], 0);
}

// printSubs(arr, 2);

// count number of subsequences with sum k

// If able to generate subsequence that satisfies requirement, return 1, else return 0;

// base case
// if valid return 1;
// else return 0;

// add(value);
// let l = f();
// remove(value);
// let r = dfs();

// return l + r;

function printCount(nums, k) {
  function dfs(i, curr, total) {
    if (i >= nums.length) {
      if (total === k) return 1;
      else return 0;
    }

    curr.push(nums[i]);
    let l = dfs(i + 1, curr, total + nums[i]);
    curr.pop();
    let r = dfs(i + 1, curr, total);

    return l + r;
  }
  return dfs(0, [], 0);
}

printCount(arr, 2);
```

# 8. Combination Sum

```js
const combinationSum = function (candidates, target) {
  const res = [];

  function backtrack(i, curr, total) {
    // successful base case
    if (total === target) {
      res.push(curr.slice());
      return;
    }

    // unsuccessful base case
    if (i >= candidates.length || total > target) return;

    // pick
    curr.push(candidates[i]);
    backtrack(i, curr, total + candidates[i]);

    // not pick
    curr.pop();
    backtrack(i + 1, curr, total);
  }

  backtrack(0, [], 0);
  return res;
};
```

# 9. Combination Sum II

```js
const arr = [1, 1, 1, 2, 2];

function combinationSumII(nums, target) {
  const res = [];

  // sort in increasing order
  nums.sort((a, b) => a - b);

  function backtrack(ind, curr, total) {
    // valid base case
    if (total === target) {
      res.push(curr.slice());
      return;
    }

    // invalid base case
    if (ind >= nums.length || total > target) return;

    // can choose to add any of the nums between ind and end of nums
    for (let i = ind; i < nums.length; i++) {
      // if current number is a duplicate, skip
      if (i > ind && nums[i] === nums[i - 1]) continue;

      // push nums[i] onto curr and backtrack
      curr.push(nums[i]);
      backtrack(i + 1, curr, total + nums[i]);
      // remove nums[i] so can try adding the next num in nums array
      curr.pop();
    }
  }

  backtrack(0, [], 0);
  return res;
}

console.log(combinationSumII(arr, 4));
```
