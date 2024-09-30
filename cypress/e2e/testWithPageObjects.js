import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with page objects', ()=>{
    beforeEach('open application', ()=>{
        cy.visit('/')
    })
    it('verify navigations across pages', ()=>{
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
        navigateTo.smartTable()
        navigateTo.toastrPage()
        navigateTo.toolTipPage()
        navigateTo.dialogPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', ()=> {
        onFormLayoutsPage.submitInlineFormWithNameAndEmail()
    })

})