import { navigateTo } from "./navigationPage"

export class FormLayoutsPage{

submitInlineFormWithNameAndEmail(name, email){
    console.log("inside method")
    navigateTo.formLayoutPage()
    cy.contains('nb-card',  'Inline form').find('form').then(nbCard=>{
        cy.wrap(nbCard).find('[placeholder="Jane Doe"]').type(name)
        cy.wrap(nbCard).find('[placeholder="Email"]').type(email)
        cy.wrap(nbCard).find('[type="checkbox"]').check({force:true})
      //  cy.wrap(nbCard).find('[type="submit"]').click()
      cy.wrap(nbCard).submit()
    })        
    }

    submitBasicFormWithEmailAndPassword(email, password){
        navigateTo.formLayoutPage()
        


    }


}

export const onFormLayoutsPage = new FormLayoutsPage()