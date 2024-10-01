
export class DatePickerPage{
selectDateinCalendar(date){
console.log("inside select date in calendar function")
cy.contains("nb-card", "Common Datepicker").find('[placeholder="Form Picker"]').then(form=>{
    cy.wrap(form).click()
    cy.wrap(form).contains("nb-calendar-day-cell", date).click()
})
}


}
export const onDatePickerPage = new DatePickerPage()