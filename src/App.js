import React, { Component } from 'react';
import './App.scss';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';
import contacts from './contacts.json';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    // console.log(parsedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  contactFormSubmit = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    //console.log(contact);

    const normalizedName = this.state.contacts.map(contact =>
      contact.name.toLowerCase(),
    );

    if (normalizedName.includes(contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  onDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // onDelete = contactId => {
  //   this.setState({contacts: this.state.contacts.filter(contact => contact.id !== contactId),
  //   })
  // }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getFiltredContacts();

    return (
      <div className="container">
        <h1 className="main__title">Phonebook</h1>
        <ContactForm onSubmit={this.contactFormSubmit} />

        <h2 className="contacts__title">Contacts</h2>

        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filtredContacts} onDelete={this.onDelete} />
      </div>
    );
  }
}

export default App;
