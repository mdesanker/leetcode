# Binary Search

Splits the search space in half with every step, so we reduce the search time from O(n) to O(logn)

## General approach

We have a search space, an array or a range, usually sorted in ascending order. For most tasks, transform the requirement into the following generalized form:

Minimize k, such that condition(k) is true

```js
function binarySearch(array) {
  function condition(val) {
    if (val) return bool;
  }

  let l = 0,
    r = array.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (condition(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}
```

Advantage of this template, is that for most of the binary search problems, we only need to modify three parts after copy-pasting this template. Never need to worry about corner cases and bugs in code:

- Correctly initialize boundary variables `l` and `r`. Only one rule: set up the boundary to include all possible elements
- Decide return value. Is it `return l;` or `return l - 1;`? Remember: after exiting the while loop, `l` is the minimal k satisfying the condition function (If we are searching for the maximum we invert the condition and search for the first length that doesn't satisfy the condition and then return l - 1)
- Design the condition function. The challenging part
