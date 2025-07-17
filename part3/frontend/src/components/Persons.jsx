const Persons = ({ persons, phonebookFilter, handlePersonDelete }) => {
  const filteredPersons = phonebookFilter
    ? persons.filter(person => person.name.toLowerCase().includes(phonebookFilter.toLowerCase()))
    : persons;

    const button = (person) => {
      return (
        <button onClick={() => handlePersonDelete(person.name)}>Delete</button>
      );
    };

  return (
    <div>
      {filteredPersons.map(person => (
        <div key={person.name}>
          {person.name} {person.number} {button(person) }
        </div>
      ))}
    </div>
  );
}

export default Persons;