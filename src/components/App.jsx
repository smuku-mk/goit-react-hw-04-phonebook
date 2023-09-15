import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList';
import { Filter } from './Filter';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      if (contacts.length === 0) {
        localStorage.removeItem('contacts');
      } else {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    }
  }

  handleSubmit = data => {
    const { contacts } = this.state;
    const { name, number } = data;
    const newContact = { id: nanoid(), name: name, number: number };
    const isContactExist = contacts.find(
      contact => contact.name === newContact.name
    );

    if (isContactExist) {
      alert(`${newContact.name} is already in contacts`);
      this.setState({ filter: '' });
    } else {
      this.setState({
        contacts: [...contacts, newContact],
        filter: '',
      });
    }
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDisplayContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} />
        <ContactList
          contacts={this.handleDisplayContacts()}
          onButtonClick={this.handleDeleteContact}
        />
      </>
    );
  }
}

export default App;
