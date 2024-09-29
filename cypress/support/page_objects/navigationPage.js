export class NavigationPage{

    formLayoutPage(){
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    }
    datePickerPage(){
        
        cy.get('[class="ng-tns-c7-4 ng-star-inserted active"]').then(menu=>{
            cy.wrap(menu).find('[class="expand-state"] g g').invoke('attr', 'data-name').then(attr=>{
                if(attr.includes('left')){
                    cy.wrap(menu).click()
                }
            })
        })

       // cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        }
    
}
export const navigateTo = new NavigationPage()