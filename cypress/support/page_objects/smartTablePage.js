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
        cy.get('thead').find('[ng-reflect-name="firstName"]').type(firstName)
        cy.get('thead').find('[ng-reflect-name="lastName"]').type(lastName)
        cy.get('thead').find('.nb-checkmark').click()
        cy.get('tbody tr').eq(0).find('td').then(dataRow=>{
            cy.wrap(dataRow).eq(2).should('contain', firstName)
        })

        cy.get('tbody tr').eq(0).find('td').then(tableRow=>{
            cy.wrap(tableRow).eq(3).should('contain', lastName)
        })

    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }



}
export const onSmartTablePage = new SmartTable()