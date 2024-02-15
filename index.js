const contacts = require("./contact.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      if (allContacts === null) {
        console.error(
          "Error while receiving contacts. Please try again later."
        );
        break;
      }
      if (allContacts.length === 0) {
        console.log("There are no contacts in the list.");
      } else {
        console.log("List of contacts:");
        console.table(allContacts, ["name", "phone", "email", "id"]);
      }
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      if (contactById) {
        console.log(`Contact by id ${id}`);
        console.log(contactById);
      } else {
        console.log(`No contact was found by id ${id}`);
        console.log(contactById);
      }
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(`Contact added successfully: ${addedContact.name}`);
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      if (removedContact) {
        console.log(`Contact removed successfully: ${removedContact.name}`);
        console.log(removedContact);
      } else {
        console.log(`Contact with id ${id} is not found.`);
        console.log(removedContact);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
