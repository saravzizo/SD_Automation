const TicketAssignee = "Pradeep Gupta"
const category = "temp2"

// Helpdesklogin
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

Cypress.Commands.add('changeTicketCategory', () => {

  cy.get('[data-qa="quick-actions_field-action-input"]').click();
  cy.get('[data-qa="happyfox_change-category"] > .p-block-kit-select_options').click();
  cy.wait(1000)
  cy.get('[data-qa="quick-actions_field-category-input"]').type(category)
  cy.wait(1000)
  cy.get('[data-qa="2"] > .p-block-kit-select_options').click();
  cy.get('[data-qa="wizard_modal_next"]').click();

})

Cypress.Commands.add('TicketAssigneeAndCategoryChange_SuccessMsg', (input) => {
  cy.readFile('cypress/fixtures/output.json').then((jsonData) => {

    let ticket = jsonData.HD_TicketIDFromUser;
    let AssigneeTicketMessage_Format = `A user was assigned to ticket ${ticket} successfully`
    let CategoryTicketMessage_Format = `Ticket ${ticket}'s category was changed successfully` 

    cy.get('.p-message_pane_message__message_label > .c-message_kit__gutter > [data-qa="message_content"] > .c-message_kit__blocks > .p-autoclog__hook > [data-qa="message-text"] > [data-qa="block-kit-renderer"] > .p-block_kit_renderer__block_wrapper > [data-qa="bk_section_block"] > .p-section_block_text_content > .p-section_block__text > .p-mrkdwn_element')
      .invoke('text')
      .then((text) => {
        let SuccessMessage = text

        if (input == "Assign")
        {
          cy.wrap(SuccessMessage).should('eq', AssigneeTicketMessage_Format)
          jsonData.AssigneeSuccessMessage = SuccessMessage
        }
        else if (input == "Category")
        {
          cy.wrap(SuccessMessage).should('eq', CategoryTicketMessage_Format)
          jsonData.CategorySuccessMessage = SuccessMessage
        }     
        cy.writeFile('cypress/fixtures/output.json', jsonData);
      })
  })
})

Cypress.Commands.add('HD_TicketAssigneeAndCategoryCheck', (input) => {
  cy.HD_Login();
  cy.visit(Cypress.env('HD_LINK'))
  cy.get('[title="All Tickets"]').click()

  cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
    let ticketMessage = jsonData.TicketMessage_ToValidateAssignee;
    cy.contains(ticketMessage).click()

    if (input == "Assign")
    {
      cy.get('.hf-ticket-action_value').contains(TicketAssignee).should('be.visible')
    }
    else if (input == "Category")
    {
      cy.get('.hf-ticket-action_value').contains(category).should('be.visible')
    }
    })
})

