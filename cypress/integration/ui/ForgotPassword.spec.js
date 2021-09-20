describe('Fundoo application-Forgot Password', function () {
    it('Visits the forgot password page and contains email field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="email"]').should('have.length', 1);
    })
    it('Visits the forgot password page and contains submitButton field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="submitButton"]').should('have.length', 1);
    })
})