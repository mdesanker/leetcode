/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const n = accounts.length;

  // parent and rank array initialized to length of accounts array
  const par = [];
  for (let i = 0; i < n; i++) par.push(i);
  const rank = new Array(n).fill(1);

  function find(n) {
    let p = par[n];
    while (p !== par[p]) {
      p = par[p];
    }
    return p;
  }

  function union(n1, n2) {
    let p1 = find(n1),
      p2 = find(n2);
    if (p1 === p2) return false;

    if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      rank[p2] += rank[p1];
    } else {
      par[p2] = p1;
      rank[p1] += rank[p2];
    }
    return true;
  }

  // we will use a map to map emails to index of the account they correspond to
  // if an email already exists, then we have found an email that maps to another account
  // we will union these two accounts
  const map = new Map(); // email: index of account

  // iterate through every account
  for (let i = 0; i < accounts.length; i++) {
    // iterate through every email of current account
    const [name, ...emails] = accounts[i];
    for (let email of emails) {
      // new email, map it to index of current account
      if (!map.has(email)) map.set(email, i);
      // else, map current account to the account the email already belongs to
      else union(i, map.get(email));
    }
  }

  // now we need to combine all the emails for each account under the parent account
  // there are potentially n accounts, but will likely be fewer
  const combinedEmails = new Array(n);

  // advantage of map over hashmap is it is iterable
  for (let [email, account] of map) {
    // find parent account for current account using union find function
    let parent = find(account);
    // add emails to a set to prevent duplicates
    if (!combinedEmails[parent]) combinedEmails[parent] = new Set();
    combinedEmails[parent].add(email);
  }

  // now we need to build the result array, containing the name followed by all associated emails in sorted order
  const res = [];
  for (let i = 0; i < combinedEmails.length; i++) {
    // skip empty accounts (these are child accounts)
    if (!combinedEmails[i]) continue;
    // get name for the account from accounts array
    const name = accounts[i][0];
    // convert set into array, sort, and then spread with name before pushing to res array
    res.push([name, ...Array.from(combinedEmails[i]).sort()]);
  }
  return res;
};

// Time: O(nk * log(nk))
//    n is number of accounts, k is maximum length of an account
//    We find have to iterate over every email when we map emails to their parent accounts: O(nk)
//    We sort the emails for every account, and the worst case will be when all emails end up belonging to the same account O(nk * lognk)

/**
While merging we consider the size of each connected component and we always choose the representative of the larger component 
to be the new representative of the smaller component, also we have included the path compression so the time complexity for 
find/union operation is α(N)\alpha({N})α(N) (Here, α(N)\alpha({N})α(N) is the inverse Ackermann function that grows so slowly, 
that it doesn't exceed 444 for all reasonable NNN (approximately N<10600 N < 10^600 ).
 */
