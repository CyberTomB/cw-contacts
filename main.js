let contacts = []
loadContacts()

console.log(contacts)

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target

  let newContact = {
    id: generateId(),
    name: form.name.value, 
    phoneNumber: form.phone.value, 
    emergency: form.emergencyContact.checked
  }  
  contacts.push(newContact)
  saveContacts()

  console.log(contacts)

  drawContacts()

  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() { 
  let contactsData = JSON.parse(localStorage.getItem("contacts"))
  if (contactsData){
    contacts = contactsData
  }
  drawContacts()
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""
  contacts.forEach(contact => {
    template += 
`
<div class="card mt-1 mb-1 ${contact.emergency ? 'emergency-contact' : ''}">
  <h3 class="mt-1 mb-1">${contact.name}</h3>
  <div class="d-flex space-between">
    <p>
      <i class="fa fa-fw fa-phone"></i>
      <span>${contact.phoneNumber}</span>
    </p>
    <i onclick="removeContact(${contact.id})" class="action fa fa-trash text-danger"></i>
  </div>
</div>
`
  document.getElementById("contact-list").innerHTML = template
  })
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  contactIndex = contacts.findIndex(contact => eval(contact.id) == contactId)
  console.log(contactIndex)
  contacts.splice(contactIndex,1)
  if(contactIndex == -1){
    throw new Error("Invalid Contact ID")
  }

  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  let newContactForm = document.getElementById("new-contact-form")
  if (newContactForm.classList.contains("hidden")){
    newContactForm.classList.remove("hidden")
  } else{
    newContactForm.classList.add("hidden")
  }
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()