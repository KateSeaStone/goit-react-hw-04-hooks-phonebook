import { useState } from 'react';
import './App.scss';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';
import contactList from './contactList.json';

export default function App() {
  const [contacts, setContacts] = useState(contactList);
  const [filter, setFilter] = useState('');

  const contactFormSubmit = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    //console.log('change', contact);

    const normalizedName = contacts.map(contact => contact.name.toLowerCase());

    //console.log('hello', normalizedName);

    if (normalizedName.includes(contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const onDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className="container">
      <h1 className="main__title">Phonebook</h1>
      <ContactForm onSubmit={contactFormSubmit} />

      <h2 className="contacts__title">Contacts</h2>

      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getFiltredContacts()} onDelete={onDelete} />
    </div>
  );
}
