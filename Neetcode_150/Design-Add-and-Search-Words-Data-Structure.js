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

// Time: O(M) where M is sum of lengths of all words in Trie
// Space: O(M)

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
