const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path/">
        Boot.dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev/path/";
  const acual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(acual).toEqual(expected)
})

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        Boot.dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const acual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(acual).toEqual(expected)
})

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1/">
          Boot.dev Blog Path One
      </a>
      <a href="/path2/">
        Boot.dev Blog Path Two
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const acual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
  expect(acual).toEqual(expected)
})

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        Invalid URL
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const acual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(acual).toEqual(expected)
})