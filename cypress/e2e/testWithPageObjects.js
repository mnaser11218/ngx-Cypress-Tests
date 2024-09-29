import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with page objects', ()=>{
    beforeEach('open application', ()=>{
        cy.visit('/')
    })
    it.only('verify navigations across pages', ()=>{
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
    })

})