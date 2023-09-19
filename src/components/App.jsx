import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSubmit = data => {
    const { name, number } = data;
    const newContact = { id: nanoid(), name: name, number: number };
    const isContactExist = contacts.find(
      contact => contact.name === newContact.name
    );

    if (isContactExist) {
      setFilter('');
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts([...contacts, newContact]);
      setFilter('');
    }
  };

  const handleFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const handleDisplayContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm data={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} />
      <ContactList
        contacts={handleDisplayContacts()}
        onButtonClick={handleDeleteContact}
      />
    </>
  );
};
