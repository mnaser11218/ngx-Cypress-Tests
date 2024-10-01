
export class DatePickerPage{
selectDateinCalendar(date){
console.log("inside select date in calendar function")
cy.contains("nb-card", "Common Datepicker").find('[placeholder="Form Picker"]').click()
}


}
export const onDatePickerPage = new DatePickerPage()