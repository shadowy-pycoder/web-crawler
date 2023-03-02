function printReport(pages) {
    const sortedUrls = Object.entries(pages)
    sortedUrls.sort((a, b) => b[1] - a[1])
    for (const [page, count] of sortedUrls) {
        console.log(`Found ${count} internal links to ${page}`)
    }
}

module.exports = {
    printReport
}