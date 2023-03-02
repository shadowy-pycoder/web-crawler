const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('trailing /', () => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path')
})
test('capitalized domain', () => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path')
})
test('almost normalized url', () => {
    expect(normalizeURL('https://wagslane.dev/path')).toBe('wagslane.dev/path')
})
test('http protocol', () => {
    expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path')
})
test('leading www', () => {
    expect(normalizeURL('https://www.youtube.com/path')).toBe('youtube.com/path')
})

test('trailing / in baseURL', () => {
    expect(getURLsFromHTML(`<a href="/pictures">Text</a>`, 'https://wagslane.dev/'))
        .toStrictEqual(['https://wagslane.dev/pictures'])
})

test('normal relative url and base url', () => {
    expect(getURLsFromHTML(`<a href="/pictures">Text</a>`, 'https://wagslane.dev'))
        .toStrictEqual(['https://wagslane.dev/pictures'])
})

test('absolute url', () => {
    expect(getURLsFromHTML(`<a href="https://wagslane.dev">Text</a>`, 'https://wagslane.dev'))
        .toStrictEqual(['https://wagslane.dev/'])
})

test('trailing / in base url html page', () => {
    expect(getURLsFromHTML(`<a href="https://wagslane.dev/">Text</a>`, 'https://wagslane.dev'))
        .toStrictEqual(['https://wagslane.dev/'])
})

test('more urls', () => {
    expect(getURLsFromHTML(`<a href="https://wagslane.dev/">Text</a> <a href="/pictures">Text</a>`, 'https://wagslane.dev'))
        .toStrictEqual(['https://wagslane.dev/', 'https://wagslane.dev/pictures'])
})