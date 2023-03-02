const form = document.querySelector(".sign-in") // form element
const submitButton = document.querySelector(".sign-in button") // Submit Button
const error = document.querySelectorAll(".error") // All error paragraphs
const overlay = document.querySelector(".overlay") // Get the parent element of the form

const formElements = {} // Create an object to keep all form elements for easy structuring
for(const element of form){
    if(element.id)formElements[element.id] = element // Keep all elements in the form Element object and use element id as key
}

const errorElements = {} // Create an object to keep all error paragraphs for easy structuring
for(const element of error){
    errorElements[element.id] = element // Keep all elements in the error Element object and use element id as key
}

const ValidateForm = (e) => { // Create a function to validateForm
    e.preventDefault()
    let noError = true // If noError is true by the end of this then all the conditions were met
    if(formElements["full-name"].value === ""){ // Check for each condition
        errorElements["full-name-error"].innerText = "Please enter your Full Name" // Create a descriptive error if condition is not met
        noError = false // A condition was not met so noError = false
    }
    if(formElements["user-name"].value === ""){
        errorElements["user-name-error"].innerText = "Please enter your User Name"
        noError = false
    }
    if(!RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(formElements["email"].value)){
        errorElements["email-error"].innerText = "Please enter a valid Email address"
        noError = false
    }
    if(formElements["password"].value === ""){
        errorElements["password-error"].innerText = "Please enter a Password"
        noError = false
    }
    if(!formElements["terms"].checked){
        errorElements["terms-error"].innerText = "Please read and agree to our terms of service"
        noError = false
    }
    if(noError){ // If all conditions were met
        for(const element in formElements){
            formElements[element].value = "" // Remove the value of the form elements
        }
        formElements["marketing"].checked = false // Uncheck the checkboxes
        formElements["terms"].checked = false
        overlay.style.display = "none" // Remove the form
    }
}

const removeError = () => { // Create a function to remove error when user shows signs of correcting the error
    for(let element in errorElements){
        errorElements[element].innerText = "" // Remove descriptive errors
    }
}

submitButton.addEventListener("click", ValidateForm) // Validate form if the submit button is clicked

form.addEventListener("input", removeError) // Remove error if user shows signs of correcting their errors
