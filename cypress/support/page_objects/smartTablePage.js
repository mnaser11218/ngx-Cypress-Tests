export class SmartTable {

    updateAgeByFirstName(firstName, age){
        cy.get('tbody').contains('tr', firstName).then(tableRow=>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addUserToTable(firstName, lastName, username, email, age){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('[ng-reflect-name="id"]').type("1")
        cy.get('thead').find('[ng-reflect-name="firstName"]').type(firstName)
        cy.get('thead').find('[ng-reflect-name="lastName"]').type(lastName)
        cy.get('thead').find('[ng-reflect-name="username"]').type(username)
        cy.get('thead').find('[ng-reflect-name="email"]').type(email)
        cy.get('thead').find('[ng-reflect-name="age"]').type(age)
        cy.get('thead').find('.nb-checkmark').click()

    }



}
export const onSmartTablePage = new SmartTable()