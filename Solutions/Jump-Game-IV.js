/**
 * @param {number[]} arr
 * @return {number}
 */

/**
Key Insight
Build the adj list to store indices for each unique value in graph, as opposed to mapping neighbors of nodes (indices)

arr = [100,-23,-23,404,100,23,23,23,3,404]

adj = {
  '3': [ 8 ],
  '23': [ 5, 6, 7 ],
  '100': [ 0, 4 ],
  '404': [ 3, 9 ],
  '-23': [ 1, 2 ]
}
 */

var minJumps = function (arr) {
  const n = arr.length;
  if (n === 1) return 0;

  // build "adj list"
  const adj = {};
  for (let i = 0; i < n; i++) {
    if (arr[i] in adj) {
      adj[arr[i]].push(i);
    } else {
      adj[arr[i]] = [i];
    }
  }

  const q = [0];
  let jumps = 0;
  const visited = new Set();

  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      visited.add(node);

      // return when we reach last node
      if (node === n - 1) return jumps;

      // add left and right neighbors to queue as long as in range and not visited yet
      for (let child of [node - 1, node + 1]) {
        if (child >= 0 && child < arr.length && !visited.has(child)) {
          q.push(child);
        }
      }

      // check neighbors of value of current node
      if (!adj[arr[node]]) continue;
      for (let nei of adj[arr[node]]) {
        if (!visited.has(nei)) {
          q.push(nei);
        }
      }

      // delete the nodes that have just been traversed so we do not traverse again (this makes algorithm linear time)
      delete adj[arr[node]];
    }
    jumps++;
  }
  return -1;
};

// Time: O(n)
// Space: O(n)
