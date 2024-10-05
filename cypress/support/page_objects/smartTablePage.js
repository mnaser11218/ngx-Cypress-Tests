export class SmartTable {

    updateAgeByFirstName(firstName, age){
        cy.get('tbody').contains('tr', firstName).then(tableRow=>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addFirstNameAndLastNameToTable(firstName, lastName){
        cy.get('thead').find('.nb-plus').click()
       // cy.get('thead').find('[ng-reflect-name="id"]').type("1")
        cy.get('thead').find('[ng-reflect-name="firstName"]').type(firstName)
        cy.get('thead').find('[ng-reflect-name="lastName"]').type(lastName)
       // cy.get('thead').find('[ng-reflect-name="username"]').type(username)
       // cy.get('thead').find('[ng-reflect-name="email"]').type(email)
       // cy.get('thead').find('[ng-reflect-name="age"]').type(age)
        cy.get('thead').find('.nb-checkmark').click()

        cy.get('tbody tr').eq(0).find('td').then(dataRow=>{
            cy.wrap(dataRow).eq(2).should('contain', firstName)
        })

        cy.get('tbody tr').eq(0).find('td').then(tableRow=>{
            cy.wrap(tableRow).eq(3).should('contain', lastName)
        })

    }



}
export const onSmartTablePage = new SmartTable()