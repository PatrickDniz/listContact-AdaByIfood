//Constantes
const containerList = document.querySelector(".list-container");
const addButton = document.querySelector(".list-add--button");
const searchInput = document.querySelector(".header-navbar--searchBar");
const phoneInput = document.querySelector(".list-add--tel"); 
const nameInput = document.querySelector(".list-add--name");

//Icons 
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`;
const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

//Funções
const recovery = () => {
    const allContacts = localStorage.getItem("contacts");

    if(!!allContacts){
        const allContactsJson = JSON.parse(allContacts)
        for(let key in allContactsJson){
             const name = key;
             const phone = allContactsJson[key]; 
             createContact(name, phone);
        }
    } else {
         saveLocal();
    }  
}

const validationName = (name) => {
    const allContacts = localStorage.getItem("contacts");
    if(allContacts){
        const allContactsJson = JSON.parse(allContacts);
        return !allContactsJson[name]; 
    } else { 
        return true; 
    }
}
const validationPhone = (phone) => { return phone == 15 } 

const createContact = (n, t) => {
    const name = n;
    const phone = t;
    const container = document.createElement("div");
    container.classList.add("list-item");
    container.setAttribute("name", name); 
    container.setAttribute("phone", phone);

    //Values
    const containerText = document.createElement("div");
    containerText.classList.add("list-item--text");
    const nameElement = document.createElement("strong");
    nameElement.innerHTML = name;
    const phoneElement = document.createElement("span");
    phoneElement.innerHTML = phone;

    containerText.appendChild(nameElement);
    containerText.appendChild(phoneElement);
    container.appendChild(containerText);

    //buttons
    const editButton = document.createElement("div");
    editButton.classList.add("list-item--edit");
    editButton.innerHTML = editIcon; 
    editButton.addEventListener("click", editContact);
    
    const removeButton = document.createElement("div");
    removeButton.classList.add("list-item--remove");
    removeButton.innerHTML = removeIcon; 
    removeButton.addEventListener("click", removeContact);

    const containerButton = document.createElement("div");
    containerButton.classList.add("list-item--buttons");
    containerButton.appendChild(editButton);
    containerButton.appendChild(removeButton);
    container.appendChild(containerButton);

    containerList.appendChild(container);
    saveLocal();
}

const addContact = () => {
    const nameAdd = document.querySelector(".list-add--name"); 
    const name = nameAdd.value;
    const phoneAdd = document.querySelector(".list-add--tel");
    const phone = phoneAdd.value; 

    nameAdd.classList.contains("error") ? nameAdd.classList.remove("error") : null;
    phoneAdd.classList.contains("error") ? phoneAdd.classList.remove("error") : null;

    if(validationName(name) && validationPhone(phone.length)){
        createContact(name, phone);
        nameAdd.value = "";
        phoneAdd.value = "";    
    } else {
        !validationName(name) ? nameAdd.classList.add("error") : null;
        !validationPhone(phone.length) ? phoneAdd.classList.add("error") : null;
    }   
}

const removeContact = (e) => { 
    e.target.parentNode.parentNode.remove() 
    saveLocal();
}

const editContact = (e) => {
    const element = e.target.parentNode.parentNode;

    //Tranformar em input
    const nameElement = element.querySelector("strong");
    const nameInputEdit = nameInput.cloneNode();
    const oldName = nameElement.innerHTML;
    nameInputEdit.value = oldName;
    nameInputEdit.classList.contains("error") ? nameInputEdit.classList.remove("error") : null;
    nameElement.parentNode.replaceChild(nameInputEdit, nameElement);
    
    const phoneElement = element.querySelector("span");
    const phoneInputEdit = phoneInput.cloneNode();
    phoneInputEdit.addEventListener('input', phoneMask);
    const oldPhone = phoneElement.innerHTML;
    phoneInputEdit.value = oldPhone;
    phoneInputEdit.classList.contains("error") ? phoneInputEdit.classList.remove("error") : null;
    phoneElement.parentNode.replaceChild(phoneInputEdit, phoneElement);
    
    // buttonSave
    const buttonsElement = element.querySelector(".list-item--buttons");
    const saveElement = document.createElement('div');
    saveElement.innerHTML = checkIcon;
    saveElement.classList.add("list-item--save");
    buttonsElement.parentNode.replaceChild(saveElement, buttonsElement);
    
    saveElement.addEventListener("click", () => {
        const newName = nameInputEdit.value;
        const newphone = phoneInputEdit.value;
    
        nameInputEdit.classList.contains("error") ? nameInputEdit.classList.remove("error") : null;
        phoneInputEdit.classList.contains("error") ? phoneInputEdit.classList.remove("error") : null;          
        
        if( (validationName(newName) && validationPhone(newphone.length)) || (newName == oldName && validationPhone(newphone.length)) ){
            element.setAttribute("name", newName);
            element.setAttribute("phone", newphone);
            nameElement.innerHTML = newName; 
            phoneElement.innerHTML = newphone;
            
            nameInputEdit.parentNode.replaceChild(nameElement, nameInputEdit);
            phoneInputEdit.parentNode.replaceChild(phoneElement, phoneInputEdit); 
            saveElement.parentNode.replaceChild(buttonsElement, saveElement);
    
            saveLocal(); 
        } else {
            !validationName(newName) && newName != oldName ? nameInputEdit.classList.add("error") : null;
            !validationPhone(newphone.length) ? phoneInputEdit.classList.add("error") : null;
        }
    });
}

const searchContact = (e) => {
    const element = e.target;
    const search = element.value.toLocaleLowerCase();
    const allContacts = document.querySelectorAll(".list-item");

    if(search != ""){
        allContacts.forEach((e) => {
            const contact = e;
            const name = e.getAttribute("name").toLocaleLowerCase();
            if(name.includes(search)){
                contact.style.display = "flex";
            } else {
                contact.style.display = "none";
            }
        })
    } else {
        allContacts.forEach((e) => {
            const contact = e;
            contact.style.display = "flex";
            
        })
    }
}

const saveLocal = () => {
    const allContacts = document.querySelectorAll(".list-item");
    const contacts = {}
    allContacts.forEach((e) => {
        const contact = e;
        const name = contact.getAttribute("name");
        const phone = contact.getAttribute("phone");
        contacts[name] = phone;
    })
    const allContactsJson = JSON.stringify(contacts);
    localStorage.setItem('contacts', allContactsJson);
} 

const phoneMask = () => {
    if (event.inputType === 'deleteContentBackward') {
        return;
    }

    let valor = event.target.value.replace(/\D/g, '');
    let formattedValue = ''; 
    
    if (valor.length > 0) {
        formattedValue = '(' + valor.substring(0, 2) + ')';
    }
    
    if (valor.length > 2) {
        formattedValue += ' ' + valor.substring(2, 7); 
    }
    
    if (valor.length > 7) {
        formattedValue += '-' + valor.substring(7, 11); 
    }
    
    event.target.value = formattedValue;
}

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    addButton.addEventListener("click", addContact);
    searchInput.addEventListener("input", searchContact);
    phoneInput.addEventListener('input', phoneMask);
    recovery();
})
