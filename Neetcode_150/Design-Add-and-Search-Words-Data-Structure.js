// https://leetcode.com/problems/design-add-and-search-words-data-structure/solutions/1073983/javascript-using-trie-and-dfs-heavily-commented-clear-solution/?orderBy=most_votes&languageTags=javascript

// Simple python implementation
// https://leetcode.com/problems/design-add-and-search-words-data-structure/solutions/774530/python-trie-solution-with-dfs-explained/?orderBy=most_votes

class TrieNode {
  constructor() {
    this.child = {}; // { 'a': TrieNode}
    this.end = false;
  }
}

var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let current = this.root;

  for (let char of word) {
    if (!current.child[char]) current.child[char] = new TrieNode();
    current = current.child[char];
  }
  current.end = true;
};

// Time: O(n) iterate through every char in word and either find node or create new node
// Space: O(n) worst case scenario, must create a new node for every char in word

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  function dfs(j, root) {
    let current = root;

    // j = current index in word
    for (let i = j; i < word.length; i++) {
      const char = word[i];

      if (char === ".") {
        // char is wildcard, need to check all child nodes of current to see if valid
        for (let child of Object.values(current.child)) {
          // run recursively on each child, incrementing index of word by 1
          if (dfs(i + 1, child)) return true;
        }
        return false;
        // char is a alpha, handle normally
      } else {
        if (!current.child[char]) return false;
        current = current.child[char];
      }
    }
    return current.end;
  }

  return dfs(0, this.root);
};

// Time: O(n) iterate through every char in string to search for node
// Space: O(n) space needed for recursive stack, worst case scenario, we a searching for a string that is entirely wildcards

/**
Creating the TrieNode class, initializing the trie, and inserting a word are all the same as in "Implement Trie/Prefix Tree" question

Search:
This search function is more complicated that the "Implement Trie/Prefix Tree" question because we allow wildcards
Wildcard means that we can have any possible character in said position
Because we need to test multiple possibilities, we will need to use recursion and dfs

Helper function
This helper function will need two parameters, the current node (node), and the index of the character in the word we are searching for (i)

We will initialize current variable to the node passed in params

Then we will use a for loop to iterate from the current index, i, through the remainder of the word
Store the current character in a variable for simplicity

The char will either be a letter or a wildcard

If the char is a wildcard, we will have to check all possible children of the current node and see if we can successfully match the remainder of the word
We can get the children of the current node using Object.values(current.child) and then loop through the children with a for-of loop
We recursively call the helper function on each child, while incrementing the pointer, because we want to check the next char
If any of these recursive calls returns true, then we can automatically return true - we have successfully matched the word to some combination in the trie
If we finish iterating through all the children and don't get a match, then we can return false

If the char is a letter
We can follow the procedure we used basic trie search
If the current node has a child that matches the char, then we move the pointer to that node
Otherwise we return false, because there is no way that word can be in the trie

If we made it out of the for-loop iterating through the rest of the characters of the word, then we have found every character we needed
We return whether the last char is an end of word char or not

We will return the result of calling the helper function on the root node of the trie, starting at the 0th index

Insert:
TC: O(n) iterate through every char in word and either find node or create new node
SC: O(n) worst case scenario, must create a new node for every char in word

Search:
TC: O(n) iterate through every char in string to search for node
SC: O(n) space needed for recursive stack, worst case scenario, we a searching for a string that is entirely wildcards, 
but will be O(1) for well-defined words without any wildcards (no recursive stack)
 */
