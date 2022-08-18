import { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [company, setCompany] = useState("");

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newCompany, setNewCompany] = useState("");

  const [contactList, setContactList] = useState([]);
  
  const addContact = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      phone: phone,
      company: company
    }).then(()=>{
      setContactList([
        ...contactList, {
          name: name,
          phone: phone,
          company: company
        }
      ]);
    })
  }

  const getContacts = () => {
    Axios.get('http://localhost:3001/contacts').then((response)=>{
      setContactList(response.data);
    })
  }

  const updateContact = (id) => {
    Axios.put('http://localhost:3001/update', {
      name: newName,
      phone: newPhone,
      company: newCompany,
      id: id
    }).then((response)=>{
      setContactList(contactList.map((val)=>{
        return val.id = id ? {id: val.id, name: newName, phone: newPhone, company: newCompany} : val
      }))
    })
  }

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setContactList(contactList.filter((val)=>{
        return val.id != id;
      }))
    })
  }

  return (
    <div className="App">
      <div className="Information">
      <label>Name:</label>
      <input type="text" 
      onChange={(event) => {setName(
        event.target.value);
      }} />
      <label>Phone Number:</label>
      <input type="tel" id="phone" name="phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required 
       onChange={(event) => {setPhone(
        event.target.value);
      }} />
      <label>Company:</label>
      <input type="text" 
      onChange={(event) => {setCompany(
        event.target.value);
      }} />
      <button onClick={addContact}>Add Contact</button>
      </div>
      <div className='Contacts'>
      <button onClick={getContacts}>Show Contacts</button>

      {contactList.map((val, key)=>{
        return (
          <div className="Contact">
            <div>
              <h3>Name: {val.name}</h3>
              <h3>Phone: {val.phone}</h3>
              <h3>Company: {val.company}</h3>
            </div>
            <div className="Update"> 
            <input 
                type="text"
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <input 
                type="text"
                onChange={(event) => {
                  setNewPhone(event.target.value);
                }}
              />
              <input 
                type="text"
                onChange={(event) => {
                  setNewCompany(event.target.value);
                }}
              />
              <button 
              onClick={()=>{
                updateContact(val.id);
              }}
              >Update</button>
              <button 
              onClick={()=>{
                deleteContact(val.id);
              }}
              >Delete</button>
            </div>
          </div>
        );
      })}

      </div>
    </div>
  );
}

export default App;
