describe('REMAINDER : IT NEEDS A SD TO BE INSTALLED IN ASSIST AI.!', () => {
})

describe('Creating Sessions', () => {
    // Creating Sessions for the End User and Agent
    it('Logging into the Slack as Agent and User', () => {
        cy.slackLogins();
    })
})

describe('Ticket Creation', () => {
    it('Creating Ticket from User login', () => {
        cy.slackEndUser();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.sendMessageToAssistAI();
        cy.scrollEnd();
        cy.createTicketByDm();
        cy.fetchLastTicketFromUser();
    })
})

describe('Verify the Ticket Assignee - Quick Action', () => {
    it('Set Ticket Assignee for the ticket created', () => {
        cy.salckAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.setTicketAssignee();
        cy.ticketAssigneeAndCategoryChange_SuccessMsg("Assign");
    })

    it('Logging into the Helpdesk', () => {
        cy.HD_Login();
    })

    it('Verify the Ticket Assignee in HelpDesk', () => {
        cy.HD_TicketAssigneeAndCategoryCheck("Assign");
    })

})

describe('Verify the Ticket Category Change - Quick Action', () => {
    it('Change Ticket Category for the ticket created', () => {
        cy.salckAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.changeTicketCategory(); 
        cy.ticketAssigneeAndCategoryChange_SuccessMsg("Category");
    })

    it('Verify the Category in HelpDesk', () => {
        cy.HD_TicketAssigneeAndCategoryCheck("Category");
    })
})

describe('Verify the Ticket Status Change - Quick Action', () => {
    it('Change Ticket Status for the ticket created', () => {
        cy.salckAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
    })

    it('Verify the Status in HelpDesk', () => {

    })
})