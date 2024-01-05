// Creating Sessions for the End User and Agent


describe('Creating Sessions', () => {

// Creating Sessions for the End User and Agent
  it('Logging into the Slack as Agent and User', () => {
    cy.SlackLogins();

  })

})

// Creating ticket from Home Tab
describe('Ticket Creation From Home Tab', () => {

// Creating ticket from the End User login
  it('creating ticket from home tab', () => {
    cy.SlackEndUser();
    cy.VisitSlack();
    cy.NavigateToAssistAiInSlack();
    cy.ClickHomeTabInSlack();
    cy.ClickCreateTicketOnHome();
    cy.TicketCreationForm();
    cy.ClickMessageTabInSlack();
    cy.FetchLastTicketFromUser();

  })

// Asserting the ID of the Ticket in the Agent login
  it('Validate the ticket in Agent login', () => {

    cy.SlackAgent();
    cy.VisitSlack();
    cy.NavigateToAssistAiInSlack();
    cy.ClickMessageTabInSlack();
    cy.FetchLastTicketFromAgent();

  })

// Logging into the Servicedesk
  it('Logging into the Servicedesk', () => {
    cy.SDAgentLogin();
  })

// Asserting the Ticket ID from the Agent in the Servicedesk
  it('Asserting the Ticket ID on the Servicedesk', () => { 
    cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
      let TicketIDFromAgent = jsonData.SD_TicketIDFromAgent
      TicketIDFromAgent = TicketIDFromAgent
      let TicketIDFromAgent_JsonName = "HomeCreation_TicketIDInSD"
      cy.FetchTicketOnSD(TicketIDFromAgent,TicketIDFromAgent_JsonName);
    })
    
    
  })

})

// Creating ticket as Onbehalf of the User
describe('Ticket Creation for the Onbehalf of Requester', () => {

// sending message from the End User
  it('User able to send a message to the Agent', () => {

    cy.SlackEndUser();
    cy.VisitSlack();
    cy.SendMsgToAgentFromUser();
  
  })

// Creating ticket from the Agent to the User's message
  it(`Agent able to create a ticket for the User's message`, () => {

    cy.SlackAgent();
    cy.VisitSlack();
    cy.NaviagateToUserProfile();
    cy.NavigateToTicketFromUserMsg();
    cy.TicektCreationFormOnbehalf();
    cy.SendMsgToUserFromAgent();
    cy.NavigateToAssistAiInSlack();
    cy.ClickMessageTabInSlack();
    cy.FetchLastTicketInAgentOnbehalf();
    


  })

// Asserting the Ticket ID from the Agent in the User login
  it('Assert the ID of the Ticket from the User which is created by Agent', () => {

    cy.SlackAgent();
    cy.VisitSlack(); 
    cy.NavigateToAssistAiInSlack();
    cy.ClickMessageTabInSlack();
    cy.FetchLastTicketInUserOnbehalf();

  })

// Asserting the Ticket ID from the Agent in ServiceDesk
  it('Asserting the Ticket ID on the Servicedesk', () => {
    
    cy.readFile('cypress/fixtures/output.json').then((jsonData) => {
      let TicketIDFromAgent = jsonData.SD_TicketCreatedOnbehalf_Agent
      let TicketIDFromAgent_JsonName = "OnBehalfOf_TicketIDInSD"
      cy.FetchTicketOnSD(TicketIDFromAgent,TicketIDFromAgent_JsonName);
    })
    
    
  })




})