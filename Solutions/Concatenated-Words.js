/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  // create set from words for easy lookup
  const wordSet = new Set(words);

  function isConcat(word) {
    // if word is in set, then return true
    if (wordSet.has(word)) return true;
    // iterate through word and check if prefix is present in wordSet
    for (let i = 0; i < word.length; i++) {
      let prefix = word.slice(0, i + 1);
      // prefix exists
      if (wordSet.has(prefix)) {
        // build suffix from remainder of word
        let suffix = word.slice(i + 1);
        // call recursively to see if suffix can be concatenated
        let result = isConcat(suffix);
        if (result) {
          return true;
        }
      }
    }
    // iterate through word and can't find prefix in wordSet
    return false;
  }

  const res = [];

  for (let word of words) {
    // remove word from set
    wordSet.delete(word);
    // check if word can be concatenated
    if (isConcat(word)) res.push(word);
    // readd word to set
    wordSet.add(word);
  }
  return res;
};
