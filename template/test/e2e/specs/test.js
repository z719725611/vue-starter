// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const projectConfig = require('../../../config/project');
module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL + projectConfig.entry['page1'];

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hui-list')
      .end();
  }
};
