import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { useState } from 'react'

function App() {
  const [List, setList] = useState({ name: '', email: '', number: '' });
  const [dataList, setDataList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = () => {
    if (validateEmail(List.email)) {
      if (editingItem !== null) {
        const updatedDataList = [...dataList];
        updatedDataList[editingItem] = List;
        setDataList(updatedDataList);
        setEditingItem(null);
      } else {
        setDataList([...dataList, List]);
      }
      setList({ name: '', email: '', number: '' });
      setErrorMessage('');
    } else {
      setErrorMessage('Enter a valid email');
    }
  }

  const handleEdit = (index) => {
    if (index !== editingItem) {
      setEditingItem(index);
      setList({ ...dataList[index] });
    } else {
      setEditingItem(null);
      setList({ name: '', email: '', number: '' });
    }
  }

  const handleDelete = (index) => {
    const updatedDataList = [...dataList];
    updatedDataList.splice(index, 1);
    setDataList(updatedDataList);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  return (
    <>
      <div className='container'>
        <div className='div'>
          <input
            type="text"
            placeholder='Enter your name'
            value={List.name}
            onChange={(e) => setList({ ...List, name: e.target.value })}
          /><br />
          <input
            type="email"
            placeholder='Enter your email'
            value={List.email}
            onChange={(e) => setList({ ...List, email: e.target.value })}
          /><br />
          <input
            type="number"
            placeholder='Enter your phone number'
            value={List.number}
            onChange={(e) => setList({ ...List, number: e.target.value })}
          /><br />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button className='btn' onClick={handleSave}>Save</button>
        <hr />
        <div>
          {dataList.length > 0 ? (
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {editingItem === index ? (
                        <input
                          type="text"
                          className='input1'
                          value={List.name}
                          onChange={(e) => setList({ ...List, name: e.target.value })}
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td>{data.email}</td>
                    <td>{data.number}</td>
                    <td>
                      {editingItem === index ? (
                        <button onClick={handleSave}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(index)}>
                          {index === editingItem ? 'Cancel' : '✎'}
                        </button>
                      )}
                      <button onClick={() => handleDelete(index)}>x</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No data available</p>)}
        </div>
      </div>
    </>
  )
}

export default App;
