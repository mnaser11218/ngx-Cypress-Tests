import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import {onDatePickerPage} from "../support/page_objects/datePickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

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

    it('should submit Inline and Basic form and select tomorrow date in the calendar', ()=> {
        navigateTo.formLayoutPage()
        // first test for user to submit inline form in layoutpage
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('mohammed', 'mohammed@gmail.com')
        // then test for user to submit email and password in basic form in layoutpage
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('email@gmail.com', 'testing123')
        // then test for user to select tomorrow date in calendar in datepicker page
        navigateTo.datePickerPage()
        onDatePickerPage.selectDateinCalendarfromToday(1)
       onDatePickerPage.selectDatePickerWithRangeFromToday(7, 9)
        
    })

    it.only('adding, removing and updating user in smart table', ()=>{

        navigateTo.smartTable()
       onSmartTablePage.addUserToTable("mohammed", "naser", "@nam", "mnas@gmail.com", 7 )
    })
    


})