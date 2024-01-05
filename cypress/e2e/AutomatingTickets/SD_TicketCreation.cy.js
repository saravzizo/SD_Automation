// Creating Sessions for the End User and Agent


describe('Creating Sessions', () => {

// Creating Sessions for the End User and Agent
  it('Logging into the Slack as Agent and User', () => {
    cy.slackLogins();

  })

})

// Creating ticket from Home Tab
describe('Ticket Creation From Home Tab', () => {

// Creating ticket from the End User login
  it('creating ticket from home tab', () => {
    cy.slackEndUser();
    cy.visitSlack();
    cy.navigateToAssistAiInSlack();
    cy.clickHomeTabInSlack();
    cy.clickCreateTicketOnHome();
    cy.ticketCreationForm();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketFromUser();

  })

// Asserting the ID of the Ticket in the Agent login
  it('Validate the ticket in Agent login', () => {

    cy.salckAgent();
    cy.visitSlack();
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketFromAgent();

  })

// Logging into the Servicedesk
  it('Logging into the Servicedesk', () => {
    cy.SDAgentLogin();
  })

// Asserting the Ticket ID from the Agent in the Servicedesk
  it('Asserting the Ticket ID on the Servicedesk', () => { 
    cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
      let TicketIDFromAgent = jsonData.SD_TicketIDFromAgent
      TicketIDFromAgent = TicketIDFromAgent
      let TicketIDFromAgent_JsonName = "HomeCreation_TicketIDInSD"
      cy.fetchTicketOnSD(TicketIDFromAgent,TicketIDFromAgent_JsonName);
    })
    
    
  })

})

// Creating ticket as Onbehalf of the User
describe('Ticket Creation for the Onbehalf of Requester', () => {

// sending message from the End User
  it('User able to send a message to the Agent', () => {

    cy.slackEndUser();
    cy.visitSlack();
    cy.sendMsgToAgentFromUser();
  
  })

// Creating ticket from the Agent to the User's message
  it(`Agent able to create a ticket for the User's message`, () => {

    cy.salckAgent();
    cy.visitSlack();
    cy.naviagateToUserProfile();
    cy.navigateToTicketFromUserMsg();
    cy.ticektCreationFormOnbehalf();
    cy.sendMsgToUserFromAgent();
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketInAgentOnbehalf();
    


  })

// Asserting the Ticket ID from the Agent in the User login
  it('Assert the ID of the Ticket from the User which is created by Agent', () => {

    cy.salckAgent();
    cy.visitSlack(); 
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketInUserOnbehalf();

  })

// Asserting the Ticket ID from the Agent in ServiceDesk
  it('Asserting the Ticket ID on the Servicedesk', () => {
    
    cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
      let TicketIDFromAgent = jsonData.SD_TicketCreatedOnbehalf_Agent
      let TicketIDFromAgent_JsonName = "OnBehalfOf_TicketIDInSD"
      cy.fetchTicketOnSD(TicketIDFromAgent,TicketIDFromAgent_JsonName);
    })
    
    
  })




})