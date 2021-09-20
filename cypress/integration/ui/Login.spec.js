describe('Fundoo application-Login', function () {
    it('Visits the login page and contains email field', function () {
        cy.visit('http://localhost:3001/');
        cy.get('[data-testid="email"]').should('have.length', 1);
    })
    it('Visits the login page and contains forgot password link', function () {
        cy.visit('http://localhost:3001/');
        cy.get('[data-testid="link"]').contains('Forgot password?');
    })
    it('Visits the login page and contains Create account link', function () {
        cy.visit('http://localhost:3001/');
        cy.get('[data-testid="link"]').contains('Create account');
    })
    it('Visits the login page and contains password field', function () {
        cy.visit('http://localhost:3001/');
        cy.get('[data-testid="password"]').should('have.length', 1);
    })
    it('Visits the login page and contains button field', function () {
        cy.visit('http://localhost:3001/');
        cy.get('[data-testid="button"]').should('have.length', 1);
    })
})