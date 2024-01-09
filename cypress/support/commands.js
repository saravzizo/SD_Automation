
import { faker } from '@faker-js/faker'

const ticketTitle = faker.lorem.word(3)

const text = faker.lorem.word(10)
const ticketMessage = faker.lorem.words(1)
const UserMessageToAgent = faker.lorem.words(1)

const Team = Cypress.env('TEAM')
const CategoryNameOnHD =  Cypress.env('CATEGORY_NAME_ON_HD')
const AgentMessageToUser = Cypress.env('AGENT_MESSAGE_TO_USER')




// Commands for Login
Cypress.Commands.add('slackAgent', (email, password) => {

  cy.session("Logging in as Agent in the Slack", () => {
    cy.visit(Cypress.env('SLACK_SIGNIN_URL'))
    cy.get('[data-qa="login_email"]').type(email)
    cy.get('[data-qa="login_password"]').type(password)
    cy.get('[data-qa="signin_button"]').click()
  })
})

Cypress.Commands.add('slackEndUser', (email, password) => {
  cy.session('Logging in as user in the Slack', () => {
    cy.visit(Cypress.env('SLACK_SIGNIN_URL'))
    cy.get('[data-qa="login_email"]').type(email)
    cy.get('[data-qa="login_password"]').type(password)
    cy.get('[data-qa="signin_button"]').click()
  })
})

Cypress.Commands.add('SDAgent', (email, password) => {
  cy.session("Logging in as Agent in the SD", () => {

    cy.visit(Cypress.env('SD_LINK'))
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('#btn-submit').click()
    cy.url().should('eq', Cypress.env('SD_LINK'))
    cy.wait(5000)

  }
  )
})

Cypress.Commands.add('slackLogins', () => {
  // Creating Sessions in Slack
  cy.slackEndUser(Cypress.env('ENDUSER_SLACK_EMAIL'), Cypress.env('ENDUSER_SLACK_PASSWORD'))
  cy.slackAgent(Cypress.env('AGENT_SLACK_EMAIL'), Cypress.env('AGENT_SLACK_PASSWORD'))
})

Cypress.Commands.add('SDAgentLogin', () => {
  // Creating Sessions in servicedesk
  cy.SDAgent(Cypress.env('AGENT_SD_EMAIL'), Cypress.env('AGENT_SD_PASSWORD'))
})

Cypress.Commands.add('HD_Login', () => {
  cy.session("Logging in as Agent in the HD", () => {

    cy.visit(Cypress.env('HD_LINK'))
    cy.get('#id_username').type(Cypress.env('AGENT_HD_EMAIL'))
    cy.get('#id_password').type(Cypress.env('AGENT_HD_PASSWORD'))
    cy.get('#btn-submit').click()
    cy.url().should('eq', Cypress.env('HD_LINK'))
    cy.wait(5000)

  })

})





// Commands for Navigation

Cypress.Commands.add('scrollEnd', () => {
  cy.get('[data-qa="message_content"]').last().scrollIntoView();
});

Cypress.Commands.add('visitSlack', () => {
  cy.visit(Cypress.env('SLACK_VISIT_URL'))
})

Cypress.Commands.add('navigateToAssistAiInSlack', () => {
  cy.get('[data-qa="channel_sidebar_name_assist-ai-(staging)"]').click()
})

Cypress.Commands.add('clickHomeTabInSlack', () => {

  cy.get('[data-qa="home"] > .c-tabs__tab_content').click()
})

Cypress.Commands.add('clickMessageTabInSlack', () => {
  cy.get('[data-qa="messages"] > .c-tabs__tab_content ').click()
})

Cypress.Commands.add('clickCreateTicketOnHome', () => {
  cy.get(':nth-child(2) > [data-qa="bk_button-element"]').click();
})

Cypress.Commands.add('sendMessageToAssistAI', () => {
  cy.get('.ql-editor > p').type(ticketMessage + '{enter}')
})






// Commands for Ticket Creation
Cypress.Commands.add('ticketCreationForm', () => {
  cy.get('[data-qa="user-new-request_field-team-input"]').type(Team)
  cy.wait(1000)
  cy.get('.p-block-kit-select_options').click();
  cy.wait(1000)
  // cy.get('#user-new-request_field-7-user-new-request_field-7').type(text)
  cy.get('#user-new-request_field-subject-user-new-request_field-subject').type(ticketTitle)
  cy.get('[data-qa="user-new-request_field-message-user-new-request_field-message"]').type(ticketMessage)
  cy.get('[data-qa="wizard_modal_next"] > [data-qa="bk-plain_text_element"] > span').click()

})

Cypress.Commands.add('ticektCreationFormOnbehalf', () => {
  cy.get('[data-qa="new-ticket-form_field-team-input"]').type(Team)
  cy.wait(1000)
  cy.get('.p-block-kit-select_options').click();
  cy.wait(1000)
  // cy.get('#new-ticket-form_field-7-new-ticket-form_field-7').type(text)
  cy.get('[data-qa="wizard_modal_next"] > [data-qa="bk-plain_text_element"] > span').click()
})

Cypress.Commands.add('createTicketByDm', () => {
  cy.wait(2000)
  cy.get('.p-actions_block_elements > :nth-child(2) > [data-qa="bk_button-element"]')
    .last()
    .click()
  cy.get('[data-qa="new-ticket-form_field-category-input"]').type(CategoryNameOnHD)
  cy.get('.p-block-kit-select_options').click();
  cy.get('[data-qa="wizard_modal_next"]').click();
  cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
    jsonData.TicketMessage_ForQuickActions = ticketMessage
    cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
  })
})




// Onbehalf Ticket Creation
Cypress.Commands.add('sendMsgToAgentFromUser', () => {
  cy.contains('Agent').click()
  cy.get('.ql-editor > p').type(UserMessageToAgent)
  cy.get('.c-wysiwyg_container__send_button--with_options').click()
})

Cypress.Commands.add('sendMsgToUserFromAgent', () => {
  cy.get('.ql-editor > p').type(AgentMessageToUser)
  cy.get('[data-qa="texty_send_button"]').click()

})

Cypress.Commands.add('naviagateToUserProfile', () => {

  cy.contains('End user').click()

})

Cypress.Commands.add('navigateToTicketFromUserMsg', () => {

  cy.get('.p-rich_text_section')
    .as('Message')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(UserMessageToAgent)
      })
    .last()
    .trigger('mouseover');
  cy.get('[data-qa="more_message_actions"]').click()
  cy.get('[data-qa="app_action_3667911238784"] > .c-menu_item__label').click()

})



// Fetching the Ticket ID from different logins
Cypress.Commands.add('fetchLastTicketFromUser', () => {

  cy.log(ticketMessage)
  cy.get('.c-message_attachment__text>>>>')
    .as('TicketID')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(ticketMessage)
      })
    .last()
    .invoke('text')
    .then((text) => {
      let TicketIDFromUser = text.slice(0, 12)
      cy.log(text)
      cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
        if (TicketIDFromUser.includes("INC")) {
          jsonData.SD_TicketIDFromUser = TicketIDFromUser;
        }
        else {
          jsonData.HD_TicketIDFromUser = TicketIDFromUser;
        }
        cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
      })

    })

})

Cypress.Commands.add('fetchLastTicketFromAgent', () => {

  cy.get('.c-message_attachment__text>>>>')
    .as('TicketID')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(ticketMessage)
      })
    .last()
    .invoke('text')
    .then((text) => {
      let TicketIDFromAgent = text.slice(0, 12)
      cy.log(text)
      cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
        let SD_TicketIDFromUser = jsonData.SD_TicketIDFromUser
        let HD_TicketIDFromUser = jsonData.HD_TicketIDFromUser

        if (TicketIDFromAgent.includes("INC")) {
          jsonData.SD_TicketIDFromAgent = TicketIDFromAgent;
          cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
          cy.wrap(TicketIDFromAgent).should('eq', SD_TicketIDFromUser)
        }
        else {
          jsonData.HD_TicketIDFromAgent = TicketIDFromAgent;
          cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
          cy.wrap(TicketIDFromAgent).should('eq', HD_TicketIDFromUser)
        }
      })
    })
})

Cypress.Commands.add('fetchLastTicketInAgentOnbehalf', () => {
  cy.get('.c-message_attachment__text>>>>')
    .as('TicketID')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(UserMessageToAgent)
      }
    )
    .last()
    .invoke('text')
    .then((text) => {
      let SD_TicketCreatedOnbehalf_Agent = text.slice(0, 12)
      cy.log(text)
      cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
        jsonData.SD_TicketCreatedOnbehalf_Agent = SD_TicketCreatedOnbehalf_Agent;
        cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
      })
    })
})

Cypress.Commands.add('fetchLastTicketInUserOnbehalf', () => {
  cy.get('.c-message_attachment__text>>>>')
    .as('TicketID')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(UserMessageToAgent)
      })
    .last()
    .invoke('text')
    .then((text) => {
      let SD_TicketCreatedOnbehalf_User = text.slice(0, 12)
      cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
        let TicketCreatedOnbehalf_Agent = jsonData.SD_TicketCreatedOnbehalf_Agent
        jsonData.SD_TicketCreatedOnbehalf_User = SD_TicketCreatedOnbehalf_User;
        cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
        cy.wrap(SD_TicketCreatedOnbehalf_User).should('eq', TicketCreatedOnbehalf_Agent)
      })
    })
})

Cypress.Commands.add('fetchTicketOnSD', (GiveInput, JsonName) => {
  cy.SDAgentLogin();
  cy.visit(Cypress.env('SD_LINK'))
  cy.get('[title="All Incidents"]').click()
  cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
    let AgentTicket
    if (JsonName == "HomeCreation_TicketIDInSD") {
      AgentTicket = jsonData.SD_TicketIDFromAgent
    }
    else if (JsonName == "OnBehalfOf_TicketIDInSD") {
      AgentTicket = jsonData.SD_TicketCreatedOnbehalf_User
    }
    cy.get('.hf-ticket-box_main > .hf-ticket-box_main_left > .hf-ticket-box_display-id')
      .as('TicketID')
      .filter(
        function (index, element) {
          return Cypress.$(element).text().includes(AgentTicket)
        })
      .invoke('text')
      .then((text) => {
        let TicketFromSD = text
        let AssertInput = GiveInput
        jsonData[JsonName] = TicketFromSD;
        cy.wrap(jsonData[JsonName]).should('eq', AssertInput)
        cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
      })
  })
})
