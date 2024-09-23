 ///<reference types="cypress" />


describe('Second suite test', ()=>{
    // it describes the body of the test itself
    it('first test', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        
        // get element by tag name
        cy.get('input')
        // get element by id
        cy.get('#inputEmail1')
        // get element by class value
        cy.get('.input-full-width')
        // get element by attribute name
        cy.get('[placeholder]')
        // get element by attribute and value
        cy.get('[placeholder="Email"]')
        // get element by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        // get element by two attributes
        cy.get('[placeholder][fullwidth]')
        // get element by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
        // get element by cypress test id (best way to get element if you have access to source code)
        cy.get('[data-cy="imputEmail1"]')
    })


    it('second test', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        // Theory
        // get() - find elements on the page by locator globally (on entire page)
        // find() - find child elements by locator
        // contains() - find html text and by text by locator
        cy.contains("Sign in")
        cy.contains('[status="warning"]', "Sign in")
        cy.contains('nb-card', "Horizontal form")


        // cypress chains and DOM

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('.custom-checkbox').click()

    })

    it('testing email and password validation', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // getting the email in using the grib form
        cy.contains('nb-card','Using the Grid')
            .find('[for="inputEmail1"]').should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]').should('contain', 'Password')

            // Cant do this because cypress is asynchronous. So usingthegrid cant be used for two different findings
            // const usingTheGrid = cy.contains('nb-card','Using the Grid')
            // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
            // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')
            // Different ways to chain usingTheGrid method

            // 1- Cypress Alias
            // cypress alias is global and can be accessed anywhere in the application

            cy.contains('nb-card','Using the Grid').as('usingTheGrid')
            cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
            cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

            // 2- using the then() callback method

            cy.contains('nb-card','Using the Grid').then(usingTheGrid=>{
                // usingTheGrid is a jquery, we need to use wrap to make it cypress method
                // only this method has access to usingTheGrid form
                cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
                cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')
            })

    })

    it('extract text value', ()=>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // multiple ways to check text in tag
        //1- 
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // 2- 
        cy.get('[for="exampleInputEmail1"]').then(emailText=>{
          const text =  emailText.text()
          expect(text).to.equal("Email address")
            //cy.wrap(emailText).should('contain', 'Email address')
        })

        //3- 
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text=>{
            expect(text).to.equal("Email address")
        })
        // you can do the same as above without the then callback and with an alias
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('inputEmail').should('contain', 'Email address')
        cy.get('@inputEmail').should('contain', 'Email address')

        //4- 
        // test that the inputEmail has a class of label
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue=>{
            expect(classValue).to.equal('label')
        })
        // 5 - 
        // test that email input has text value 
        cy.get('#exampleInputEmail1').type('test@test.com')
        // invoke property 
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
    })

    it('radio buttons', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // get the radio button
        // getting the using the grid nb-card
        cy.contains('nb-card', 'Using the Grid')
        // getting all the check boxes in the card
            .find('[type="radio"]').then(radioButton => {
                // check the first box, then check if it is checked.
               cy.wrap(radioButton).eq(0).check({force:true}).should('be.checked')
               cy.wrap(radioButton).eq(1).check({force:true})
               cy.wrap(radioButton).eq(0).should('not.be.checked')
               cy.wrap(radioButton).eq(2).should('be.disabled')
            })
    })

    it('checkboxes', ()=> {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        // check and uncheck all checkboxes
        // cy.get('[type="checkbox"]').check({force:true})
        // cy.get('[type="checkbox"]').uncheck({force:true})


        // click on and off the first checkbox
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})
       
    })

    it('Date picker', ()=>{

        function selectDayFromCurrent(day){
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

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        // when using contains, you can put two arguments to specify exactly where the text is contained
        cy.contains('nb-card','Common Datepicker')
            .find('input').then(input=>{
              


                // click on input to pop our calendar
                cy.wrap(input).click()
               let dateToAssert = selectDayFromCurrent(100)
                // get the individual box of date and click date 21
              //  cy.get('.day-cell').not('bounding-month').contains(dateToAssert).click()
                // check that input value aligns with date clicked
                cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
                // // another way to test the input value aligns with date clicked
                // cy.wrap(input).should('have.value', `Sep ${dateUpdate}, 2024`)
                
            })
    })  

    it('Lists and dropdowns',()=>{
        cy.visit('/')
       //cy.get('nav').find('nb-select').click()
   //1-
       cy.get('nav nb-select').click()
       cy.get('.options-list').contains('Dark').click()
       cy.get('nav nb-select').should('contain', 'Dark')

       // 2- test entire dropdown through loop
       cy.get('nav nb-select').then(dropdown=> {
        cy.wrap(dropdown).click()
       cy.get('.options-list nb-option').each((listItem, index)=>{
        const itemText = listItem.text().trim()
        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        if(index < 3){
            cy.wrap(dropdown).click()
        }
       })
       })

    })

    it.only('Web tables', ()=>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //1 - Get the row by text

        // cy.get('tbody').contains('tr', 'Larry').then(tableRow=>{
        //     cy.wrap(tableRow).find('.nb-edit').click()
        //     cy.wrap(tableRow).find('[placeholder="Last Name"]').clear().type("hi")
        //     cy.wrap(tableRow).find('.nb-checkmark').click()
        //     cy.wrap(tableRow).should('contain', 'hi')
        // })  

        // 1 - change jacobs age to 50 and test it
        cy.get('tbody').contains('tr', 'Jacob').then(tableRow=>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("50")
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', "50")
        })

        //2 - add user to table
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('[ng-reflect-name="id"]').type("3")
        cy.get('thead').find('[ng-reflect-name="firstName"]').type("Mohammed")
        cy.get('thead').find('[ng-reflect-name="lastName"]').type("Naser")
        cy.get('thead').find('[ng-reflect-name="username"]').type("@Naser")
        cy.get('thead').find('[ng-reflect-name="email"]').type("naser@gmail.com")
        cy.get('thead').find('[ng-reflect-name="age"]').type("50")
        cy.get('thead').find('.nb-checkmark').click()

        // test that the username was added to the table

        // cy.get('tbody').contains('tr', 'Mohammed').then(tableRow=>{
        //     cy.wrap(tableRow).find('td').eq(6).should('contain', '50')
        // })
        cy.get('tbody tr').eq(0).find('td').then(dataRow=>{
            cy.wrap(dataRow).eq(2).should('contain', 'Mohammed')
        })

        cy.get('tbody tr').eq(0).find('td').then(tableRow=>{
            cy.wrap(tableRow).eq(3).should('contain', 'Naser')
        })
// testing

    })

})




























 // you can begin the test script with either describe() or context()

// the describe method will take two arguments: the first is a string describing
// the what it does, and the second is a callback function
// describe('First suite test', ()=>{
// // you can have a nested describe method
//     describe('Second suite test', ()=>{
//         // you can add a before each hook
//         beforeEach('login', ()=> {
//             // repeat for every test inside this describe method, not outside
//         })

//         // it describes the body of the test itself
//         it('first test', ()=>{
//             // put the code of the test itself
//         })
    
//     })




//     // it describes the body of the test itself
//     it('first test', ()=>{
//         // put the code of the test itself
//     })
//     it('second test', ()=>{
//         // put the code of the test itself
//     })
//     it('third test', ()=>{
//         // put the code of the test itself
//     })
//     it('fourth test', ()=>{
//         // put the code of the test itself
//     })


// })


// describe('Second suite test', ()=>{
//     // it describes the body of the test itself
//     it('first test', ()=>{
//         // put the code of the test itself
//     })
//     it('second test', ()=>{
//         // put the code of the test itself
//     })
//     it('third test', ()=>{
//         // put the code of the test itself
//     })
//     it('fourth test', ()=>{
//         // put the code of the test itself
//     })


// })
