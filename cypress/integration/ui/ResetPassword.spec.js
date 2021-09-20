describe('Fundoo application-Reset Password', function () {
    it('Visits the reset password page and contains password field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="password"]').should('have.length', 1);
    })
    it('Visits the reset password page and contains confirmPassword field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="confirmPassword"]').should('have.length', 1);
    })
    it('Visits the reset password page and contains submitButton field', function () {
        cy.visit('http://localhost:3001/register');
        cy.get('[data-testid="submitButton"]').should('have.length', 1);
    })
})