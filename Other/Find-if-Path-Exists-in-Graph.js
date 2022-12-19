// https://leetcode.com/problems/find-if-path-exists-in-graph/solutions/2463606/simple-javascript-solution-faster-than-92-26-bfs/?orderBy=most_votes&languageTags=javascript

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  let length = edges.length;
  if (length == 0) return true;

  let visited = [];
  let queue = [source];
  while (queue.length > 0) {
    let element = queue.shift();
    visited[element] = true;
    let i = 0;
    while (i < edges.length) {
      let index = edges[i].indexOf(element);
      if (index != -1) {
        let secondElement = edges[i][1 - index];
        if (secondElement == destination) {
          return true;
        } else {
          if (!visited[secondElement]) {
            queue.push(secondElement);
          }
        }
      }
      i++;
    }
  }
  return false;
};

// Time: O()
// Space: O()
