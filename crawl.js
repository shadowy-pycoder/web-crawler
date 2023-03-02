const jsdom = require("jsdom")
const { JSDOM } = jsdom


function normalizeURL(url) {
    try {
        const urlObj = new URL(url)
        if (urlObj.pathname.endsWith('/') && !urlObj.search) {
            urlObj.pathname = urlObj.pathname.slice(0, -1)
        }
        if (urlObj.host.startsWith('www')) {
            urlObj.host = urlObj.host.slice(4, urlObj.host.length)
        }
        const newURL = `${urlObj.host}${urlObj.pathname}${urlObj.search}`
        return newURL
    } catch (error) {
        return null
    }

}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const urls = []
    const aTags = dom.window.document.querySelectorAll('a')
    if (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1)
    }
    for (let atag of aTags) {
        if (atag.href.startsWith('/')) {
            atag.href = `${baseURL}${atag.href}`
        }
        urls.push(atag.href)
    }
    return urls
}


async function crawlPage(baseURL, currentURL, pages = {}) {
    const normURL = normalizeURL(currentURL)
    if (!normURL) {
        return
    }
    if (normURL in pages) {
        pages[normURL] = ++pages[normURL]
        //console.log(`${currentURL} already checked ...Skipped`)
        return pages
    } else if (!currentURL.includes(baseURL)) {
        //console.log(`${currentURL} ...Skipped `)
        pages[normURL] = 1
        return pages
    } else {
        try {
            const response = await fetch(currentURL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content-type': 'text/html',
                }

            })
            if (response.status > 399) {
                //console.error(`Cannot download url (${currentURL}): error ${response.status} ...Skipped`)
                return
            } else if (!response.headers.get('content-type').includes('text/html')) {
                //console.error(`Invalid type of headers: ${response.headers.get('content-type')} ...Skipped`)
                return
            } else {
                pages[normURL] = 1
                const htmlPage = await response.text()
                const urlArray = getURLsFromHTML(htmlPage, baseURL)
                for (let url of urlArray) {
                    await crawlPage(baseURL, url, pages)
                }
                return pages
            }
        } catch (error) {
            console.error(`Something went wrong. ${error}`)
        }

    }
}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}




