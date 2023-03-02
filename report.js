function printReport(pages, baseURL) {
    const baseUrlObj = new URL(baseURL)
    const sortedUrls = Object.entries(pages)
    sortedUrls.sort((a, b) => b[1] - a[1])
    for (const [page, count] of sortedUrls) {
        if (page.includes(baseUrlObj.host)) {
            console.log(`Found ${count} internal links to ${page}`)
        } else {
            console.log(`Found ${count} external links to ${page}`)
        }
    }
}

module.exports = {
    printReport
}