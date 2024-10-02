
export class DatePickerPage{
   selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
  
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute=>{
            if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                cy.get('[data-name="chevron-right"]').click();
                selectDayFromCurrent(day)
            }else{
                cy.get('.day-cell').not('bounding-month').contains(futureDay).click()

            }
        })
        return dateToAssert;
        
    }
selectDateinCalendar(date){
console.log("inside select date in calendar function")
cy.contains("nb-card", "Common Datepicker").find('[placeholder="Form Picker"]').then(form=>{
    cy.wrap(form).click()
   // cy.wrap(form).contains("nb-calendar-day-cell", date).click()
  // let date = this.selectDayFromCurrent(7);
//    cy.wrap(form).invoke('prop', 'value').should('contain', date)
//cy.wrap(form).invoke('prop', 'value').should('contain', date)
cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr=>{
    cy.get('.day-cell').not('bounding-month').contains(date).click()
    cy.wrap(form).invoke('prop', 'value').should('eq', 'Oct 5, 2024')
})





})
}


}
export const onDatePickerPage = new DatePickerPage()