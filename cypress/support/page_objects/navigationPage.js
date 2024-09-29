const selectGroupMenuItem = (groupName) =>{

    cy.contains('a', groupName).then(menu=>{
        cy.wrap(menu).find('[class="expand-state"] g g').invoke('attr', 'data-name').then(attr=>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })

}

export class NavigationPage{

   

    formLayoutPage(){
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }
    datePickerPage(){
 selectGroupMenuItem('Form')
      // cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        }
    
}
export const navigateTo = new NavigationPage()