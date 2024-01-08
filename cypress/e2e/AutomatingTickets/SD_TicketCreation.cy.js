// Creating Sessions for the End User and Agent
describe('Creating Sessions', () => {
  it('Logging into the Slack as Agent and User', () => {
    cy.slackLogins();

  })

  it('Logging into the Servicedesk', () => {
    cy.SDAgentLogin();
  })

})

// Creating ticket from Home Tab
describe('Ticket Creation From Home Tab', () => {
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

  it('Validate the ticket in Agent login', () => {

    cy.slackAgent();
    cy.visitSlack();
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketFromAgent();

  })

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
describe('Ticket Creation by Onbehalf of Requester', () => {
  it('Verify User able to send message to the Agent', () => {

    cy.slackEndUser();
    cy.visitSlack();
    cy.sendMsgToAgentFromUser();
  
  })

  it(`Verify Agent able to create ticket for the User's message`, () => {

    cy.slackAgent();
    cy.visitSlack();
    cy.naviagateToUserProfile();
    cy.navigateToTicketFromUserMsg();
    cy.ticektCreationFormOnbehalf();
    cy.sendMsgToUserFromAgent();
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketInAgentOnbehalf();
    


  })

  it('Validate the ticket on the User login', () => {

    cy.slackAgent();
    cy.visitSlack(); 
    cy.navigateToAssistAiInSlack();
    cy.clickMessageTabInSlack();
    cy.fetchLastTicketInUserOnbehalf();

  })

  it('Asserting the Ticket ID on the Servicedesk', () => {
    cy.readFile('cypress/fixtures/outputFile.json').then((jsonData) => {
      let TicketIDFromAgent = jsonData.SD_TicketCreatedOnbehalf_Agent
      let TicketIDFromAgent_JsonName = "OnBehalfOf_TicketIDInSD"
      cy.fetchTicketOnSD(TicketIDFromAgent,TicketIDFromAgent_JsonName);
    })
    
    
  })

})