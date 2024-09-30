import { navigateTo } from "./navigationPage"

export class FormLayoutsPage{

submitInlineFormWithNameAndEmail(name, email){
    //navigateTo.formLayoutPage()
    cy.contains('nb-card',  'Inline form').find('form').then(nbCard=>{
        cy.wrap(nbCard).find('[placeholder="Jane Doe"]').type(name)
        cy.wrap(nbCard).find('[placeholder="Email"]').type(email)
        cy.wrap(nbCard).find('[type="checkbox"]').check({force:true})
      //  cy.wrap(nbCard).find('[type="submit"]').click()
      cy.wrap(nbCard).submit()
    })        
    }

    submitBasicFormWithEmailAndPassword(email, password){
      //  navigateTo.formLayoutPage()
        cy.contains('nb-card', 'Basic form').find('form').then(form=>{
        cy.wrap(form).find('[type="email"]').type(email)
        cy.wrap(form).find('[type="password"]').type(password)
       // cy.wrap(form).find('[class="custom-checkbox"]').check()
        })
    }


}

export const onFormLayoutsPage = new FormLayoutsPage()