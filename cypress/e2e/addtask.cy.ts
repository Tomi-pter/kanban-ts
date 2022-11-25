describe('board flow', () => {
  it('user can add, edit, and delete board and tasks', () => {
    // add board
    cy.visit('http://localhost:3000');
    cy.findByRole('button', { name: /\+ create new board/i }).click();
    cy.findByRole('textbox', { name: /board name/i }).type('new board');
    cy.findByTestId('0col').type('todo');
    cy.findByTestId('modalCreate').click();

    cy.findByRole('heading', { name: /new board/i }).should('be.visible');
    cy.findByRole('heading', { name: /todo \(0\)/i }).should('be.visible');

    // add task
    cy.findByRole('button', { name: /add task/i }).click();
    cy.findByRole('heading', { name: /add task/i }).should('be.visible');

    cy.findByRole('textbox', { name: /title/i }).type('write tests');
    cy.findByRole('textbox', { name: /description/i }).type(
      'writing different types of tests(unit, integration, e2e)'
    );
    cy.findByTestId('0id').type('unit tests');
    cy.findByRole('button', { name: /\+ add new subtask/i }).click();
    cy.findByTestId('1id').type('integration tests');
    cy.findByRole('button', { name: /\+ add new subtask/i }).click();
    cy.findByTestId('2id').type('e2e tests');

    cy.findByTestId('modalAdd').click();

    cy.findByRole('heading', { name: /write tests/i }).should('be.visible');
    cy.findByRole('heading', { name: /write tests/i }).should('be.visible');
    cy.findByText(/0 of 3 subtasks/i).should('be.visible');

    // view task
    cy.findByRole('button', { name: /write tests/i }).click();
    cy.findByText(/subtasks \(0 of 3\)/i).should('be.visible');
    cy.findByRole('checkbox', { name: /unit tests/i }).check();
    cy.findByRole('checkbox', { name: /integration tests/i }).check();
    // cy.findByTitle(/modal/i).click(10, 20);
    cy.get('body').type('{esc}');

    cy.findByText(/2 of 3 subtasks/i).should('be.visible');

    // edit board
    cy.findByRole('button', { name: /options/i }).click();
    cy.findByRole('button', { name: /edit board/i }).click();
    cy.findByRole('heading', { name: /edit board/i }).should('be.visible');

    cy.findByRole('button', { name: /\+ add new column/i }).click();
    cy.findByTestId('1col').type('doing');
    cy.findByRole('button', { name: /save changes/i }).click();

    cy.findByRole('heading', { name: /doing \(0\)/i }).should('be.visible');

    cy.findByRole('button', { name: /\+ add column/i }).click();
    cy.findByRole('heading', { name: /edit board/i }).should('be.visible');
    cy.get('body').type('{esc}');
    // cy.findByRole('heading', { name: /edit board/i }).should('not.be.visible');

    // hide/show sidebar
    cy.findByRole('button', { name: /hide sidebar/i }).click();
    cy.findByRole('button', { name: /show sidebar/i }).should('be.visible');

    // toggle theme
    cy.findByRole('main')
      .should('have.css', 'background-color')
      .should('eq', 'rgb(244, 247, 253)');
    cy.findByRole('button', { name: /show sidebar/i }).click();
    cy.findByRole('img', { name: /light mode/i }).click();
    cy.findByRole('main')
      .should('have.css', 'background-color')
      .should('eq', 'rgb(32, 33, 44)');

    // rgb(244, 247, 253)
    // rgb(32, 33, 44)

    // delete board
    cy.findByRole('button', { name: /roadmap/i }).click();
    cy.findByRole('button', { name: /options/i }).click();
    cy.findByRole('button', { name: /delete board/i }).click();
    cy.findByRole('button', { name: /delete/i }).click();

    cy.findByRole('heading', { name: /all boards \(3\)/i }).should(
      'be.visible'
    );

    // edit task
    cy.findByRole('button', {
      name: /design settings and search pages 2 of 3 subtasks/i
    }).click();
    const view = cy.findByTitle(/modal/i);
    view.findByRole('button', { name: /options/i }).click();
    cy.findByRole('button', { name: /edit task/i }).click();
    cy.findByRole('textbox', { name: /title/i }).clear().type('designo');
    cy.findByRole('button', { name: /edit task/i }).click();

    cy.findByRole('heading', { name: /designo/i }).should('be.visible');
  });
});
