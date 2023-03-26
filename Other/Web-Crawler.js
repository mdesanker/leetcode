/**
 * @param {string} startUrl
 * @param {HtmlParser} htmlParser
 * @return {string[]}
 */
var crawl = function (startUrl, htmlParser) {
  const visited = new Set();
  visited.add(startUrl);
  const hostname = startUrl.split("/")[2];

  function dfs(urlList) {
    for (const url of urlList) {
      if (!visited.has(url) && url.includes(hostname)) {
        visited.add(url);
        dfs(htmlParser.getUrls(url));
      }
    }
  }
  dfs(htmlParser.getUrls(startUrl));
  return Array.from(visited);
};
// Time: O(m * l)
// Space: O(m * l)
