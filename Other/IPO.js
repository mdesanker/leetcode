/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  let capitalsAscQueue = new MinPriorityQueue();
  let profitsDescQueue = new MaxPriorityQueue();

  // add every project to capital min heap
  for (let i = 0; i < capital.length; i++)
    capitalsAscQueue.enqueue([capital[i], profits[i]], capital[i]);

  // iterate k steps because we want k projects
  for (let i = 0; i < k; i++) {
    // pull all viable projects from capital heap (capital[i] <= w)
    // push into profits max heap (this will put projects with max profit first)
    while (
      !capitalsAscQueue.isEmpty() &&
      capitalsAscQueue.front().element[0] <= w
    ) {
      let el = capitalsAscQueue.dequeue().element;
      profitsDescQueue.enqueue(el, el[1]);
    }
    // if no more projects to add, return
    if (profitsDescQueue.isEmpty()) return w;
    // pull project with max profit from top of profits max heap
    w += profitsDescQueue.dequeue().element[1];
  }
  return w;
};

// Time: O(nlogn) in worst case scenario, every project is insert and pulled from both heaps once.
//    Each heap operation if O(logn) done O(n) times for every project
// Space: O(n) for the heaps

/**
Greedy approach - choose the project with most profit at every step that meets capital requirement
1. Create MinPriorityQueue capitals_asc_queue and fill it with [capital, profit] pairs. It will be sorted by increasing capital.
2. Keep polling pairs from capitals_asc_queue until the project out of current capital capability. 
    Put them into MaxPriorityQueue profits_desc_queue which sort by profit decreasingly.
3. Poll first from profits_desc_queue, it will be the project with maximum profit within current capital capability. 
    Add the profit to capital w.
4. Repeat step 2 and 3 till finish k steps or no suitable project (profits_desc_queue.isEmpty()).
 */
