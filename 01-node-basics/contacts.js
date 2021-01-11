const fs = require ('fs');

const path = require ('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// console.log(contactsPath);

function getContactList() {
    const data = fs.readFileSync(contactsPath, "utf-8");
    return JSON.parse(data);
  }
  
  function listContacts() {
    const data = getContactList();
    console.table(data);
  }
  
  function getContactById(contactId) {
    const data = getContactList();
    const contactById = data.find((contact) => contact.id === contactId);
    console.table(contactById);
  }
  
  function removeContact(contactId) {
    const data = getContactList();
    const deletedContact = data.filter((contact) => contact.id !== contactId);
    console.table(deletedContact);
  
  }
  
  function addContact(name, email, phone) {
    const data = getContactList();
    const appendContact = {
      id: data.length + 1,
      name,
      email,
      phone,
    };
    data.push(appendContact);
    fs.writeFileSync(contactsPath, JSON.stringify(data, "", 2));
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };