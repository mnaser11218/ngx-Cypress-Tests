import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import {onDatePickerPage} from "../support/page_objects/datePickerPage"

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
        navigateTo.formLayoutPage()
        // first test for user to submit inline form in layoutpage
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('mohammed', 'mohammed@gmail.com')
        // then test for user to submit email and password in basic form in layoutpage
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('email@gmail.com', 'testing123')
        // then test for user to select tomorrow date in calendar in datepicker page
        navigateTo.datePickerPage()
        onDatePickerPage.selectDateinCalendar('5')
         
    })
    


})