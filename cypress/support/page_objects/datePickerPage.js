
export class DatePickerPage{
   selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleDateString('default', {month: 'short'})
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
  
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute=>{
            if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                cy.get('[data-name="chevron-right"]').click();
                this.selectDayFromCurrent(day)
            }else{
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()

            }
        })
        return dateToAssert;
        
    }
selectDateinCalendarfromToday(dayFromToday){
console.log("inside select date in calendar function")
cy.contains("nb-card", "Common Datepicker").find('[placeholder="Form Picker"]').then(input=>{
    cy.wrap(input).click()
    let date = this.selectDayFromCurrent(dayFromToday)
cy.wrap(input).invoke('prop', 'value').should('contain', date)
cy.wrap(input).should('have.value', date)

// cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr=>{
//     cy.get('.day-cell').not('bounding-month').contains(date).click()
//     cy.wrap(form).invoke('prop', 'value').should('eq', 'Oct 5, 2024')
// })
})
}

selectDatePickerWithRangeFromToday(firstDay, secondDay){
    console.log("inside select date in calendar function")
cy.contains("nb-card", "Datepicker With Range").find('input').then(input=>{
    cy.wrap(input).click()
   // cy.get('nb-calendar-navigation').click()
     let dateAssertFirst = this.selectDayFromCurrent(firstDay)
    let dateAssertSecond = this.selectDayFromCurrent(secondDay)
    let finalDate = dateAssertFirst + ' - ' + dateAssertSecond

     
cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
cy.wrap(input).should('have.value', finalDate)

// testing a specific date of the month: 
// cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr=>{
//     cy.get('.day-cell').not('bounding-month').contains(date).click()
//     cy.wrap(form).invoke('prop', 'value').should('eq', 'Oct 5, 2024')
// })
})

}


}
export const onDatePickerPage = new DatePickerPage()