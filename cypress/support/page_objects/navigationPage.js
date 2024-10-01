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
        cy.contains('Datepicker').click( {force: true})
        }
        smartTable(){
            selectGroupMenuItem('Tables & Data')
            cy.contains('Smart Table').click()
        }
        toastrPage(){
            selectGroupMenuItem('Modal & Overlays')
            cy.contains('Toastr').click()
        }
        dialogPage(){
            selectGroupMenuItem('Modal & Overlays')
            cy.contains('Dialog').click()
        }
        toolTipPage(){
           selectGroupMenuItem('Modal & Overlays')
            cy.contains('Tooltip').click()
        }



    
}
export const navigateTo = new NavigationPage()