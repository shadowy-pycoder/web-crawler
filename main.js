const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length !== 3) {
        console.error('One argument (baseURL) is expected!');
        process.exit(1);
    } else {
        const baseURL = process.argv[2]
        console.log(`Web crawler is starting at ${baseURL}`)
        console.log('Printing report. Please wait...')
        const pages = await crawlPage(baseURL, baseURL)
        printReport(pages, baseURL)
    }

}

main()
