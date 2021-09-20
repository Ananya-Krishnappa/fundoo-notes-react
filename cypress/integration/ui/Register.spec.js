describe('Fundoo application-Register', function () {
    it('Visits the register page and contains firstname field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="firstName"]').should('have.length', 1);
    })
    it('Visits the register page and contains lastName field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="lastName"]').should('have.length', 1);
    })
    it('Visits the register page and contains email field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="email"]').should('have.length', 1);
    })
    it('Visits the register page and contains password field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="password"]').should('have.length', 1);
    })
    it('Visits the register page and contains confirm password field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="confirmPassword"]').should('have.length', 1);
    })
    it('Visits the register page and contains submit button field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="submitButton"]').should('have.length', 1);
    })
})
