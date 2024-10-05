export class SmartTable {

    addUserToTable(user){
        cy.get('tbody').contains('tr', 'Jacob').then(tableRow=>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("50")
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', "50")
        })
    }

}
export const onSmartTablePage = new SmartTable()