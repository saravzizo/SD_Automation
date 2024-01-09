import { faker } from '@faker-js/faker'

const TicketAssignee = Cypress.env('TICKET_ASSIGNEE')
const category = Cypress.env('CATEGORY')
const ticketStatus = Cypress.env('TICKET_STATUS')
const randomPrivateMsg = faker.lorem.words(2)





// Commands for Quick Actions
Cypress.Commands.add('clickQuickActionButton', () => {

  cy.get('.p-actions_block_elements > :nth-child(2) > [data-qa="bk_button-element"]')
    .last()
    .click();
})


Cypress.Commands.add('setTicketAssignee', () => {
  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_assign-ticket"] > .p-block-kit-select_options').click();
  cy.wait(1000)
  cy.get('[data-qa="quick-actions_field-assignee-input"]').type(TicketAssignee)
  cy.get('[data-qa="quick-actions_field-assignee_option_0"]').click();
  cy.get('[data-qa="wizard_modal_next"]').click();

})

Cypress.Commands.add('changeTicketCategory', () => {

  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_change-category"] > .p-block-kit-select_options').click();
  cy.wait(1000)
  cy.get('[data-qa="quick-actions_field-category-input"]').type(category)
  cy.wait(1000)
  cy.get('[data-qa="2"] > .p-block-kit-select_options').click();
  cy.get('[data-qa="wizard_modal_next"]').click();

})

Cypress.Commands.add('changeTicketStatus',() =>{

  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_change-status"] > .p-block-kit-select_options').click();
  cy.get('[data-qa="quick-actions_field-status-input"]').type(ticketStatus)
  cy.get('[data-qa="2"] > .p-block-kit-select_options').click();
  cy.get('[data-qa="wizard_modal_next"]').click()

})

Cypress.Commands.add('addPrivateNote',() =>{

  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_add-private-note"] > .p-block-kit-select_options').click();
  cy.wait(2000)
  cy.get('[data-qa="quick-actions_field-message-quick-actions_field-message"]').type(randomPrivateMsg)
  cy.get('[data-qa="quick-actions_field-alert-to-input"]').click()
  cy.get('[data-qa="all_subscribers"] > .p-block-kit-select_options').click()
  cy.get('[data-qa="wizard_modal_next"]').click()
  cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
    jsonData.PrivateMessage = randomPrivateMsg
    cy.writeFile('cypress/fixtures/outputFile.json', jsonData);
  })

})



// Fetching the message after Quick Actions
Cypress.Commands.add('successMessageCheck', (input) => {
  cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {

    let ticket = jsonData.HD_TicketIDFromUser;
    let AssigneeTicketMessage_Format = `A user was assigned to ticket ${ticket} successfully`
    let CategoryTicketMessage_Format = `Ticket ${ticket}'s category was changed successfully`
    let TicketStatusMessage_Format = `Ticket ${ticket}'s status was changed successfully`
    let PrivateNoteMessage_Format = `A Private note was added to ticket ${ticket} successfully`

    if (input == "Assign"){
      cy.get('.p-message_pane_message__message_label >>>>>>>>')
        .filter(
          function (index, element) {
            return Cypress.$(element).text().includes(AssigneeTicketMessage_Format)
          })
        .invoke('text')
        .then((text) => {
          let SuccessMessage = text
          cy.wrap(SuccessMessage).should('eq', AssigneeTicketMessage_Format)
          jsonData.AssigneeSuccessMessage = AssigneeTicketMessage_Format
        })

    }
    else if (input == "Category"){
      cy.get('.p-message_pane_message__message_label >>>>>>>>')
        .filter(
          function (index, element) {
            return Cypress.$(element).text().includes(CategoryTicketMessage_Format)
          })
        .invoke('text')
        .then((text) => {
          let SuccessMessage = text
          cy.wrap(SuccessMessage).should('eq', CategoryTicketMessage_Format)
          jsonData.CategorySuccessMessage = CategoryTicketMessage_Format
        })
    }
    else if (input == "status"){
      cy.get('.p-message_pane_message__message_label >>>>>>>>')
        .filter(
          function (index, element) {
            return Cypress.$(element).text().includes(TicketStatusMessage_Format)
          })
        .invoke('text')
        .then((text) => {
          let SuccessMessage = text
          cy.wrap(SuccessMessage).should('eq', TicketStatusMessage_Format)
          jsonData.TicketStatusSuccessMessage = TicketStatusMessage_Format
        })
    }
    else if (input == "private"){
      cy.get('.p-message_pane_message__message_label >>>>>>>>')
        .filter(
          function (index, element) {
            return Cypress.$(element).text().includes(PrivateNoteMessage_Format)
          })
        .invoke('text')
        .then((text) => {
          let SuccessMessage = text
          cy.wrap(SuccessMessage).should('eq', PrivateNoteMessage_Format)
          jsonData.PrivateNoteSuccessMessage = PrivateNoteMessage_Format
        })
    }
    cy.writeFile('cypress/fixtures/outputFile.json', jsonData);

  })
})


// Asserting the changes on HelpDesk
Cypress.Commands.add('HD_QuickActionsAssertion', (input) => {
   
    cy.HD_Login();
    cy.visit(Cypress.env('HD_LINK'))
    cy.get('[title="All Tickets"]').click()
    cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
    let ticketMessage = jsonData.TicketMessage_ForQuickActions;
    let privatemsg = jsonData.PrivateMessage
    cy.contains(ticketMessage).click()

    if (input == "Assign") {
      cy.get('.hf-ticket-action_value').contains(TicketAssignee).should('be.visible')
    }
    else if (input == "Category") {
      cy.get('.hf-ticket-action_value').contains(category).should('be.visible')
    }
    else if (input == "private") {
      cy.get(' .hf-update-box > .hf-update-box_header > .hf-update-box_header_summary').contains(privatemsg).should('be.visible')
    }
    else if (input == "status") {
      cy.get('.hf-ticket-status').contains(ticketStatus).should('be.visible')
    }

  })
})

