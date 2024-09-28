import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with page objects', ()=>{
    beforeEach('open application', ()=>{
        cy.visit('/')
    })
    it.only('verify navigation across pages', ()=>{
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
    })

})