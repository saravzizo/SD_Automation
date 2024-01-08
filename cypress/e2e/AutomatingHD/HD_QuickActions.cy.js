describe('REMAINDER : IT NEEDS A SD TO BE INSTALLED IN ASSIST AI.!', () => {
})

describe('Creating Sessions', () => {
    // Creating Sessions for the End User and Agent
    it('Logging into the Slack as Agent and User', () => {
        cy.slackLogins();
    })
    it('Logging into the Helpdesk', () => {
        cy.HD_Login();
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

describe('Private Note - Quick Action', () => {
    it('Add Private Note for the ticket created', () => {
        cy.slackAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.addPrivateNote();
        cy.successMessageCheck("private")
    })

    it('Verify the Private Note in HelpDesk', () => {
        cy.HD_QuickActionsAssertion("private");
    })
})

describe('Ticket Assignee - Quick Action', () => {
    it('Set Ticket Assignee for the ticket created', () => {
        cy.slackAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.setTicketAssignee();
        cy.successMessageCheck("Assign");
    })

    it('Verify the Ticket Assignee in HelpDesk', () => {
        cy.HD_QuickActionsAssertion("Assign");
    })

})

describe('Ticket Category Change - Quick Action', () => {
    it('Change Ticket Category for the ticket created', () => {
        cy.slackAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.changeTicketCategory();
        cy.successMessageCheck("Category");
    })

    it('Verify the Category in HelpDesk', () => {
        cy.HD_QuickActionsAssertion("Category");
    })
})

describe('Ticket Status Change - Quick Action', () => {
    it('Change Ticket Status for the ticket created', () => {
        cy.slackAgent();
        cy.visitSlack();
        cy.navigateToAssistAiInSlack();
        cy.clickMessageTabInSlack();
        cy.scrollEnd();
        cy.fetchLastTicketFromAgent();
        cy.clickQuickActionButton();
        cy.changeTicketStatus();
        cy.successMessageCheck("status")
    })

    it('Verify the Status in HelpDesk', () => {
        cy.HD_QuickActionsAssertion("status");
    })
})



