
import { faker } from '@faker-js/faker'

const ticketTitle = faker.lorem.word(3)
const Team = "IT"
const text = faker.lorem.word(10)
const ticketMessage = faker.lorem.words(1)


const UserMessageToAgent = faker.lorem.words(1)
const AgentMessageToUser = "Ticket has been created on behalf of you"

const CategoryNameOnHD = "regression"
const DataFieldCS = faker.lorem.words(3)
const TicketAssignee = "Pradeep Gupta"



// Commands for Login
Cypress.Commands.add('SlackAgent', (email, password) => {

  cy.session("Logging in as Agent in the Slack", () => {
    cy.visit(Cypress.env('SLACK_SIGNIN'))
    cy.get('[data-qa="login_email"]').type(email)
    cy.get('[data-qa="login_password"]').type(password)
    cy.get('[data-qa="signin_button"]').click()
  })
})

Cypress.Commands.add('SlackEndUser', (email, password) => {
  cy.session('Logging in as user in the Slack', () => {
    cy.visit(Cypress.env('SLACK_SIGNIN'))
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

Cypress.Commands.add('SlackLogins', () => {
  // Creating Sessions in Slack
  cy.SlackEndUser(Cypress.env('ENDUSER_SLACK_EMAIL'), Cypress.env('ENDUSER_SLACK_PASSWORD'))
  cy.SlackAgent(Cypress.env('AGENT_SLACK_EMAIL'), Cypress.env('AGENT_SLACK_PASSWORD'))
})

Cypress.Commands.add('SDAgentLogin', () => {
  // Creating Sessions in servicedesk
  cy.SDAgent(Cypress.env('AGENT_SD_EMAIL'), Cypress.env('AGENT_SD_PASSWORD'))
})





// Commands for Navigation

Cypress.Commands.add('ScrollEnd', () => {
  cy.get('[data-qa="message_content"]').last().scrollIntoView();
});

Cypress.Commands.add('VisitSlack', () => {
  cy.visit(Cypress.env('SLACK_VISIT_URL'))
})

Cypress.Commands.add('NavigateToAssistAiInSlack', () => {
  cy.get('[data-qa="channel_sidebar_name_assist-ai-(staging)"]').click()
})

Cypress.Commands.add('ClickHomeTabInSlack', () => {

  cy.get('[data-qa="home"] > .c-tabs__tab_content').click()
})

Cypress.Commands.add('ClickMessageTabInSlack', () => {
  cy.get('[data-qa="messages"] > .c-tabs__tab_content > span').click()
})

Cypress.Commands.add('ClickCreateTicketOnHome', () => {
  cy.get(':nth-child(2) > [data-qa="bk_button-element"]').click();
})

Cypress.Commands.add('SendMessageToAssistAI', () => {
  cy.get('.ql-editor > p').type(ticketMessage + '{enter}')
})

Cypress.Commands.add('ClickQuickActionButton', () => {
  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > :nth-child(3) > [data-qa="bk_actions_block"] > .p-actions_block_elements > :nth-child(2) > [data-qa="bk_button-element"]')
    .last()
    .click();
})

Cypress.Commands.add('SetTicketAssignee', () => {
  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_assign-ticket"] > .p-block-kit-select_options').click();
  cy.get('[data-qa="quick-actions_field-assignee-input"]').type(TicketAssignee)
  cy.get('[data-qa="quick-actions_field-assignee_option_0"]').click();
  cy.get('[data-qa="wizard_modal_next"]').click();

})

Cypress.Commands.add('TicketAssigneeMessage', () => {
  cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
    let ticket = jsonData.HD_TicketIDFromUser;
    let TicketMessage_Format = `A user was assigned to ticket ${ticket} successfully`
    cy.get('.p-message_pane_message__message_label > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__blocks > .p-autoclog__hook > [data-qa="message-text"] > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .p-mrkdwn_element')
      .invoke('text')
      .then((text) => {
        let SuccessMessage_AfterAssigneeSet = text
        cy.wrap(SuccessMessage_AfterAssigneeSet).should('eq', TicketMessage_Format)
        jsonData.TicketMessage = SuccessMessage_AfterAssigneeSet
        cy.writeFile('cypress/fixtures/output.json', jsonData);
      })
  })
})





// Commands for Ticket Creation
Cypress.Commands.add('TicketCreationForm', () => {
  cy.get('[data-qa="user-new-request_field-team-input"]').type(Team)
  cy.wait(1000)
  cy.get('.p-block-kit-select_options').click();
  cy.wait(1000)
  cy.get('#user-new-request_field-7-user-new-request_field-7').type(text)
  cy.get('#user-new-request_field-subject-user-new-request_field-subject').type(ticketTitle)
  cy.get('[data-qa="user-new-request_field-message-user-new-request_field-message"]').type(ticketMessage)
  cy.get('[data-qa="wizard_modal_next"] > [data-qa="bk-plain_text_element"] > span').click()

})

Cypress.Commands.add('TicektCreationFormOnbehalf', () => {
  cy.get('[data-qa="new-ticket-form_field-team-input"]').type(Team)
  cy.get('.p-block-kit-select_options').click();
  cy.get('#new-ticket-form_field-7-new-ticket-form_field-7').type(text)
  cy.get('[data-qa="wizard_modal_next"] > [data-qa="bk-plain_text_element"] > span').click()
})

Cypress.Commands.add('CreateTicketOnAIHome', () => {
  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__blocks > .p-autoclog__hook > [data-qa="message-text"] > [data-qa="block-kit-renderer"] > :nth-child(2) > [data-qa="bk_actions_block"] > .p-actions_block_elements > :nth-child(2) > [data-qa="bk_button-element"]')
    .last()
    .click()
  cy.get('[data-qa="new-ticket-form_field-category-input"]').type(CategoryNameOnHD)
  cy.get('.p-block-kit-select_options').click();
  cy.get('#new-ticket-form_field-t-cf-12-new-ticket-form_field-t-cf-12').type(DataFieldCS)
  cy.get('[data-qa="wizard_modal_next"]').click();
})




// Onbehalf Ticket Creation
Cypress.Commands.add('SendMsgToAgentFromUser', () => {
  cy.get('[data-qa="channel_sidebar_name_saravanan.s"] > span').click()
  cy.get('.ql-editor > p').type(UserMessageToAgent)
  cy.get('.c-wysiwyg_container__send_button--with_options').click()
})

Cypress.Commands.add('SendMsgToUserFromAgent', () => {
  cy.get('.ql-editor > p').type(AgentMessageToUser)
  cy.get('[data-qa="texty_send_button"]').click()

})

Cypress.Commands.add('NaviagateToUserProfile', () => {

  cy.contains('END USER').click()

})

Cypress.Commands.add('NavigateToTicketFormUserMsg', () => {

  cy.get(' [data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__blocks > [data-qa="message-text"] > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper > .p-rich_text_block > .p-rich_text_section')
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
Cypress.Commands.add('FetchLastTicketFromUser', () => {

  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
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
      cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
        if (TicketIDFromUser.includes("INC")) {
          jsonData.SD_TicketIDFromUser = TicketIDFromUser;
        }
        else {
          jsonData.HD_TicketIDFromUser = TicketIDFromUser;
        }
        cy.writeFile('cypress/fixtures/output.json', jsonData);
      })

    })

})

Cypress.Commands.add('FetchLastTicketFromAgent', () => {
  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
    .as('TicketID')
    .last()
    .invoke('text')
    .then((text) => {
      let TicketIDFromAgent = text.slice(0, 12)
      cy.log(text)
      cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
        let SD_TicketIDFromUser = jsonData.SD_TicketIDFromUser
        let HD_TicketIDFromUser = jsonData.HD_TicketIDFromUser

        if (TicketIDFromAgent.includes("INC")) {
          jsonData.SD_TicketIDFromAgent = TicketIDFromAgent;
          cy.writeFile('cypress/fixtures/output.json', jsonData);
          cy.wrap(TicketIDFromAgent).should('eq', SD_TicketIDFromUser)
        }
        else {
          jsonData.HD_TicketIDFromAgent = TicketIDFromAgent;
          cy.writeFile('cypress/fixtures/output.json', jsonData);
          cy.wrap(TicketIDFromAgent).should('eq', HD_TicketIDFromUser)
        }
      })
    })
})

Cypress.Commands.add('FetchLastTicketInAgentOnbehalf', () => {
  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
    .as('TicketID')
    .filter(
      function (index, element) {
        return Cypress.$(element).text().includes(UserMessageToAgent)
      }
    )
    .invoke('text')
    .then((text) => {
      let SD_TicketCreatedOnbehalf_Agent = text.slice(0, 12)
      cy.log(text)
      cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
        jsonData.SD_TicketCreatedOnbehalf_Agent = SD_TicketCreatedOnbehalf_Agent;
        cy.writeFile('cypress/fixtures/output.json', jsonData);
      })
    })
})

Cypress.Commands.add('FetchLastTicketInUserOnbehalf', () => {
  cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
    .as('TicketID')
    .last()
    .invoke('text')
    .then((text) => {
      let SD_TicketCreatedOnbehalf_User = text.slice(0, 12)
      cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
        let TicketCreatedOnbehalf_Agent = jsonData.SD_TicketCreatedOnbehalf_Agent
        jsonData.SD_TicketCreatedOnbehalf_User = SD_TicketCreatedOnbehalf_User;
        cy.writeFile('cypress/fixtures/output.json', jsonData);
        cy.wrap(SD_TicketCreatedOnbehalf_User).should('eq', TicketCreatedOnbehalf_Agent)
      })
    })
})

Cypress.Commands.add('FetchTicketOnSD', (GiveInput, JsonName) => {
  cy.SDAgentLogin();
  cy.visit(Cypress.env('SD_LINK'))
  cy.get('[title="All Incidents"]').click()
  cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
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
        cy.writeFile('cypress/fixtures/output.json', jsonData);
      })
  })
})
