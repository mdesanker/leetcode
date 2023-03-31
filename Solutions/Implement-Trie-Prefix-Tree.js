// https://leetcode.com/problems/implement-trie-prefix-tree/solutions/2094586/js-simple-explained-prefix-trees/?orderBy=most_votes&languageTags=javascript

class TrieNode {
  constructor() {
    // children is hashmap of chars to make search easy
    this.children = {};
    this.endOfWord = false;
  }
}

var Trie = function () {
  // initialize with root node
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let current = this.root;

  for (char of word) {
    // node doesn't exist, create
    if (current.children[char]) {
      current.children[char] = new TrieNode();
    }
    // node already exists, updated current
    current = current.children[char];
  }
  // mark as end of word
  current.endOfWord = true;
};

// Time: O(n) where n is word length. Every iteration we either examine or create a node in the trie until reach end of word
// Space: O(n) worst case scenario, new word doesn't share a prefix with existing keys, so we have to add n new nodes

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let current = this.root;

  for (char of word) {
    // letter doesn't exist - return false
    if (current.children[char]) return false;
    // letter exists, updated current
    current = current.children[char];
  }
  // return whether node is end of word
  return current.endOfWord;
};

// Time: O(n) every iteration we search for the next character in the word. Worst case we have to search for all n characters
// Space: O(1) no nodes are createad

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let current = this.root;

  for (char of prefix) {
    if (current.children[char]) return false;
    current = current.children[char];
  }
  // don't check if end of word, since only prefix search
  return true;
};

// Time: O(n) every iteration we search for the next character in the word. Worst case we have to search for all n characters
// Space: O(1) no nodes are createad

/**
Trie or prefix tree is a tree data structure can be used for retrieval of a key in a dataset of strings.
Every node is a key, and the path from root to leaf builds a string (word in this example)

We need to initialize a TrieNode class which can be used to create the nodes in the trie
In this case, our keys are letters in the alphabet, so a node could potentially have 26 children (assuming only lower case, english characters)
We will store the children for a node in a hashmap, instead of an array, because this will give us O(1) lookup time and insertion
We will also need to indicate whether a node marks the end of a string

class TrieNode {
  constructor() {
    this.child = {};
    this.end = false;
  }
}

Initialize:
Initialize the trie with a TrieNode

Insert:
Set a pointer to the root of our trie
For every char in the word, we will search for the char in the children of the current node
If the child node does not exist, we will create a new TrieNode and point the char to it
Then we move the pointer and check for the next char in the word
After we have finished adding all the characters from the word, we mark that the last char is the end of the word

Search:
Initialize pointer to root of our trie
We search for the next char in the word in the children of the current word
If the char doesn't exist in the hash, return false, because this word does not exist in the data structure
If it does exist, then move the pointer to the desired node so we can loop and check for the next character
Once we find the last character in the word, we need to return whether this marks the end of a word or not

Starts with:
Same procedure as search, except we return true regardless of whether or not last letter marks the end of a word
We just want to show whether or not there is a word that starts with the prefix that has been passed

Insert:
TC: O(n) we iterate through every char in the string and search for it or create a new node
SC: O(n) worst case scenario, a new node must be created for every character (it does not share a prefix with any existing word in trie)

Search: 
TC: O(n) worst case scenario, we must check every char in the word we are searching for
SC: O(1) we are not creating any nodes to store info, so no additional memory is required

Starts with:
TC: O(n) worst case scenario, we must check every char in the word we are searching for
SC: O(1) we are not creating any nodes to store info, so no additional memory is required
 */
