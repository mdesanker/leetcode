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

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// Time: O(c) where c is number of chars in word. Arguably O(n) where n is number of nodes in tree if tree only has 1 word
// Space: O(c) where c is number of chars in word. Worst case have to create new node for each char in word
