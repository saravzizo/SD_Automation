describe('REMAINDER : IT NEEDS A SD TO BE INSTALLED IN ASSIST AI.!', () => {
})

describe('Creating Sessions', () => {
    // Creating Sessions for the End User and Agent
    it('Logging into the Slack as Agent and User', () => {
        cy.SlackLogins();
    })
})

describe('Ticket Creation', () => {
    it('Creating Ticket from User login', () => {
        cy.SlackEndUser();
        cy.VisitSlack();
        cy.NavigateToAssistAiInSlack();
        cy.ClickMessageTabInSlack();
        cy.SendMessageToAssistAI();
        cy.ScrollEnd();
        cy.CreateTicketByDm();
        cy.FetchLastTicketFromUser();
    })
})

describe('Verify the Ticket Assignee - Quick Action', () => {
    it('Set Ticket Assignee for the ticket created', () => {
        cy.SlackAgent();
        cy.VisitSlack();
        cy.NavigateToAssistAiInSlack();
        cy.ClickMessageTabInSlack();
        cy.ScrollEnd();
        cy.FetchLastTicketFromAgent();
        cy.ClickQuickActionButton();
        cy.SetTicketAssignee();
        cy.TicketAssigneeAndCategoryChange_SuccessMsg("Assign");
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
        cy.SlackAgent();
        cy.VisitSlack();
        cy.NavigateToAssistAiInSlack();
        cy.ClickMessageTabInSlack();
        cy.ScrollEnd();
        cy.FetchLastTicketFromAgent();
        cy.ClickQuickActionButton();
        cy.changeTicketCategory(); 
        cy.TicketAssigneeAndCategoryChange_SuccessMsg("Category");
    })

    it('Verify the Category in HelpDesk', () => {
        cy.HD_TicketAssigneeAndCategoryCheck("Category");
    })
})