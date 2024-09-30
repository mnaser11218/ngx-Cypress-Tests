import { navigateTo } from "./navigationPage"

export class FormLayoutsPage{

submitInlineFormWithNameAndEmail(){
    console.log("inside method")
    navigateTo.formLayoutPage()
    cy.contains('nb-card',  'Inline form').find('form').then(nbCard=>{
        cy.wrap(nbCard).find('[placeholder="Jane Doe"]').type('testing')
        cy.wrap(nbCard).find('[placeholder="Email"]').type('testing@gmail.com')
        cy.wrap(nbCard).find('[type="submit"]').click()

    })
}


}

export const onFormLayoutsPage = new FormLayoutsPage()