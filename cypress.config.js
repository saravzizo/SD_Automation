const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
  env:
  {
    "HD_LINK":"https//:www.google.com",
    "SD_LINK":"https//:www.google.com",
    "SLACK_VISIT_URL":"https//:www.google.com",
    "SLACK_SIGNIN_URL":"dummy",
    
    "ENDUSER_SLACK_EMAIL":"enduser@gmail.com",
    "ENDUSER_SLACK_PASSWORD":"user@12345",

    "AGENT_SLACK_EMAIL":"slackagent@gmail.com",
    "AGENT_SLACK_PASSWORD":"agent@123",

    "ENDUSER_HD_EMAIL":"hduser@gmail.com",
    "ENDUSER_HD_PASSWORD":"user@12345",

    "AGENT_HD_EMAIL":"hdagent@gmail.com",
    "AGENT_HD_PASSWORD":"agent@123",

    "AGENT_SD_EMAIL":"sdagent@gmail.com",
    "AGENT_SD_PASSWORD":"agent@123",

    "TEAM":"Dummy",
    "CATEGORY_NAME_ON_HD":"cat",
    "AGENT_MESSAGE_TO_USER":"success msg",
    
    "TICKET_ASSIGNEE":"Agent Name",
    "CATEGORY":"cat1",

  },
  

pageLoadTimeout: 100000,
chromeWebSecurity: false,
defaultCommandTimeout : 100000,

});
