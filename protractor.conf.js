exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/*.spec.js'],
    jasmineNodeOpts: {
        // Use colors in the command line report.
        showColors: true
    },
    capabilities: {
        browserName: 'firefox'
    }
}
