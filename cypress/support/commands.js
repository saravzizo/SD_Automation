
import { faker } from '@faker-js/faker'

const ticketTitle = faker.lorem.word(3)
const Team = "IT"
const text = faker.lorem.word(10)
const ticketMessage = faker.lorem.words(8)


const UserMessageToAgent = `Please create a ticket on behalf ${faker.lorem.words(2)}`
const AgentMessageToUser = "Ticket has been created on behalf of you"

// Commands for Login
Cypress.Commands.add('SlackAgent', (email, password) => {

    cy.session("Logging in as Agent in the Slack", () => {
        cy.visit('https://supporthiveworkspace.slack.com/sign_in_with_password?redir=%2Fssb%2Fredirect%3Fentry_point%3Dsignin')
        cy.get('[data-qa="login_email"]').type(email)
        cy.get('[data-qa="login_password"]').type(password)
        cy.get('[data-qa="signin_button"]').click()
        cy.wait(30000)
    })

}
)

Cypress.Commands.add('SlackEndUser', (email, password) => {

    cy.session('Logging in as user in the Slack', () => {
        cy.visit('https://supporthiveworkspace.slack.com/sign_in_with_password?redir=%2Fssb%2Fredirect%3Fentry_point%3Dsignin')
        cy.get('[data-qa="login_email"]').type(email)
        cy.get('[data-qa="login_password"]').type(password)
        cy.get('[data-qa="signin_button"]').click()
        cy.wait(30000)

    })

}
)

Cypress.Commands.add('SDAgent', (email, password) => {
    cy.session("Logging in as Agent in the SD", () => {

        cy.visit('https://saravanansd.supporthive.com/staff/login/')
        cy.get('#username').type(email)
        cy.get('#password').type(password)
        cy.get('#btn-submit').click()
        cy.wait(10000)
    }
    )
})

Cypress.Commands.add('SlackLogins', (email, password) => {
    // Creating Sessions in Slack
    cy.fixture('LoginCredentials').then((LoginCredentials) => {
        cy.SlackEndUser(LoginCredentials.Enduser_slack_email, LoginCredentials.Enduser_slack_password)
        cy.SlackAgent(LoginCredentials.Agent_slack_email, LoginCredentials.Agent_slack_password)
      })
})

Cypress.Commands.add('SDAgentLogin', () => {

    // Creating Sessions in servicedesk
    cy.fixture('LoginCredentials').then((LoginCredentials) => {
        cy.SDAgent(LoginCredentials.Agent_SD_email, LoginCredentials.Agent_SD_password)
    });
})



// Commands for Navigation
Cypress.Commands.add('VisitSlack', () => {
    cy.visit("https://supporthiveworkspace.slack.com/")
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



// Commands for Ticket Creation
Cypress.Commands.add('TicketCreationForm', () => {

    cy.get('[data-qa="user-new-request_field-team-input"]').type(Team)
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
    cy.wait(5000)
    

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

    cy.get('[data-qa="channel_sidebar_name_end-user"] > span').click()

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
Cypress.Commands.add('FetchLastTicketFromUser',() => {  
        
    cy.wait(5000)
    cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
      .as('TicketID')
      .filter(

        function (index, element) {
          return Cypress.$(element).text().includes(ticketMessage)
        }

      )
      .invoke('text')
      .then((text) => {

        let SD_TicketIDFromUser = text.slice(0, 12)
        cy.log(text)

        cy.readFile('cypress/downloads/output.json').then((jsonData) => {
          jsonData.SD_TicketIDFromUser = SD_TicketIDFromUser;
          cy.writeFile('cypress/downloads/output.json', jsonData);
        })

    })

})

Cypress.Commands.add('FetchLastTicketFromAgent', () => {
    cy.wait(5000)
    cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
      .as('TicketID')
      .last()
      .invoke('text')
      .then((text) => {

        let SD_TicketIDFromAgent = text.slice(0, 12)
        cy.log(text)

        cy.readFile('cypress/downloads/output.json').then((jsonData) => {
          let TicketIDFromUser = jsonData.SD_TicketIDFromUser
          jsonData.SD_TicketIDFromAgent = SD_TicketIDFromAgent;
          cy.writeFile('cypress/downloads/output.json', jsonData);
          cy.wrap(SD_TicketIDFromAgent).should('eq', TicketIDFromUser)
        })

      })
})

Cypress.Commands.add('FetchLastTicketInAgentOnbehalf', () => {
    cy.wait(10000)
    cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
      .as('TicketID')
      .last()
      .invoke('text')
      .then((text) => {

        let SD_TicketCreatedOnbehalf_Agent = text.slice(0, 12)
        cy.log(text)

        cy.readFile('cypress/downloads/output.json').then((jsonData) => {
          jsonData.SD_TicketCreatedOnbehalf_Agent = SD_TicketCreatedOnbehalf_Agent;
          cy.writeFile('cypress/downloads/output.json', jsonData);
        })

      })
})

Cypress.Commands.add('FetchLastTicketInUserOnbehalf', () => {
    cy.wait(10000)
    cy.get('[data-qa="message_container"] > .c-message_kit__hover > .c-message_kit__actions > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__attachments > .p-autoclog__hook > .c-message_attachment_v2 > .c-message_attachment_v2__body > .c-message__message_blocks > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper--first > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .c-message_attachment__text > .p-mrkdwn_element > [data-qa="bk_markdown_element"] > .c-link > b')
      .as('TicketID')
      .last()
      .invoke('text')
      .then((text) => {
        let SD_TicketCreatedOnbehalf_User = text.slice(0, 12)


        cy.readFile('cypress/downloads/output.json').then((jsonData) => {
          let TicketCreatedOnbehalf_Agent = jsonData.SD_TicketCreatedOnbehalf_Agent
          jsonData.SD_TicketCreatedOnbehalf_User = SD_TicketCreatedOnbehalf_User;
          cy.writeFile('cypress/downloads/output.json', jsonData);
          cy.wrap(SD_TicketCreatedOnbehalf_User).should('eq', TicketCreatedOnbehalf_Agent)
          
        })

      })
})

Cypress.Commands.add('FetchTicketOnSD', (GiveInput, JsonName) => {
    cy.SDAgentLogin();
    cy.visit('https://saravanansd.supporthive.com/staff/login/')
    cy.wait(5000)
    cy.get('[title="All Tickets"]').click()
    cy.wait(5000)

    cy.get('.hf-ticket-box_main > .hf-ticket-box_main_left > .hf-ticket-box_display-id')
    .as('TicketID')
    .first()
    .invoke('text')
    .then((text) => {  

        let TicketFromSD = text
        let AssertInput = GiveInput
        cy.readFile('cypress/downloads/output.json').then((jsonData) => {
            jsonData[JsonName] = TicketFromSD;
            cy.wrap(jsonData[JsonName]).should('eq', AssertInput)
            cy.writeFile('cypress/downloads/output.json', jsonData);

          })
    })

})
