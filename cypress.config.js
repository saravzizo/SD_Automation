const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

pageLoadTimeout: 100000,
chromeWebSecurity: false,
defaultCommandTimeout : 100000,

});
