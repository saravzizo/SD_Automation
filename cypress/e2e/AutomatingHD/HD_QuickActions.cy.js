describe('REMAINDER : IT NEEDS A SD TO BE INSTALLED IN ASSIST AI.!', () => {
})



describe('Creating Sessions', () => {
    // Creating Sessions for the End User and Agent
    it('Logging into the Slack as Agent and User', () => {
        cy.SlackLogins();
    })
})

describe('Verify the Ticket Assignee Quick Action', () => {

    it('Creating Ticket from User', () => {
        cy.SlackEndUser();
        cy.VisitSlack();
        cy.NavigateToAssistAiInSlack();
        cy.ClickMessageTabInSlack();
        cy.SendMessageToAssistAI();
        cy.ScrollEnd();
        cy.CreateTicketOnAIHome();

        cy.FetchLastTicketFromUser();

    })

    it('Set Ticket Assignee to the ticket created by the user ', () => {
        cy.SlackAgent();
        cy.VisitSlack();
        cy.NavigateToAssistAiInSlack();
        cy.ClickMessageTabInSlack();
        cy.ScrollEnd();
        cy.FetchLastTicketFromAgent();
        cy.ClickQuickActionButton();
        cy.SetTicketAssignee();
        cy.TicketAssigneeMessage();

    })


})
