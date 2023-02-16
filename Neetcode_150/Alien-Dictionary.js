/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  const adj = {};
  // create a key for every char in words and map it to a set (help prevent duplicates)
  for (let word of words) {
    for (let char of word) adj[char] = new Set();
  }
  // iterate up until second last word in words because we will compare two words at a time
  for (let i = 0; i < words.length - 1; i++) {
    let w1 = words[i],
      w2 = words[i + 1];
    // only need to compare up to the length of the shortest words, otherwise we are comparing chars and empty spaces
    const minLen = Math.min(w1.length, w2.length);
    // if two words have same prefix, but first word is longer, then invalid dictionary
    if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen))
      return "";
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        // only want first differing character
        // add first differing char in w2 as child of w1
        adj[w1[j]].add(w2[j]);
        break;
      }
    }
  }

  // track nodes where all children have been traversed and confirmed there are no loops
  const visited = new Set();
  // track nodes that are in the current path (loop detection)
  const path = new Set();

  const res = [];

  function dfs(char) {
    // if char already in path, we have a loop
    if (path.has(char)) return false;
    // if char in visited, then we know it is valid option for next node in graph
    if (visited.has(char)) return true;

    // add char to path
    path.add(char);

    // traverse neighbors
    for (let nei of adj[char]) {
      // if dfs returns false, then we have a loop, return false
      if (!dfs(nei)) return false;
    }

    // backtracking, remove char from current path
    path.delete(char);
    // add to visited because we have confirmed no loops in its children
    visited.add(char);
    // push char onto result array because postorder dfs
    res.push(char);
    return true;
  }

  // call dfs on every char in adj list (doesn't matter where you start)
  for (let char of Object.keys(adj)) {
    if (!dfs(char)) return "";
  }
  return res.reverse().join("");
};

// Time: O(c) where c is the number of chars in words array because we iterate over every single char in worst case scenario in order to build adj list
//      Because we cannot have cycles (directed acyclic graph - DAG) there can be at most n - 1 edges (n is length of words array)
//      It is also impossible for there to be more than 1 edge between any pair of nodes, this means there cannot be more than U^2 edges (where U is the number of unique chars in dictionary)
//      Therefore the min

/**
Can use DFS or BFS for this, but BFS has a lot more "bookkeeping" than DFS
We will build a graph placing the characters in order
If we have disconnected graphs, then we can have multiple solutions

Postorder DFS will help us ensure we get characters in the right order

A -> B -> C && A -> C

If dfs starts at A, we can go to B or C. Supposed we go to C first, our result will be "ACB", which is wrong, because B needs to come before C.

If we use postorder dfs, then we traverse all children before we traverse the parent, so we put child nodes first in result (reverse order)

In this example we will start A, we go to C, C has no children, so we add it to res "C".
Then we go back to A, and traverse its other child B. B has a child C, but it has already been traversed. So we can add B to res "CB". Then we go back to A, all its children have been traversed, so it can be added to res "CBA"

This will give us chars in the reverse order, so we just have to reverse the result before we return it

---
TC: O(c)

where c is the number of chars in words array because we iterate over every single char in worst case scenario in order to build adj list

For the DFS:
Because we cannot have cycles (directed acyclic graph - DAG) there can be at most n - 1 edges (n is length of words array)
It is also impossible for there to be more than 1 edge between any pair of nodes, this means there cannot be more than U^2 edges (where U is the number of unique chars in dictionary)
Therefore the max number of edges is min(U^2, n - 1)

Time complexity for dfs is O(v + e) -> O(U + min(U^2, n - 1)) -> O(U + min(U^2, n))

Now we combine the two parts: building adj list and dfs

O(c + u + min(u^2, n))

We know n (total number of strings in words) < c (total number of chars)
and u (number of unique chars) < c (total number of chars)

So we can remove u

O(c + min(u^2, n))

Because both u and n and smaller than c, the min of them will always be smaller than c, so overall TC is O(c)
---
SC: O(1) if bounded by english alphabet, O(u + min(u^2, n)) if arbitrary number of letters allowed

The adj list uses O(v + e) memory, which is O(u + min(u^2, n))

If we are limited by english alphabet, u is 26, so O(26^2) is a fixed number to O(1). 
But if the alien alphabet can have an arbitrary number of chars, we cannot place an upper cound on this
*/
