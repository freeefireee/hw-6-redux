import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUsers, createUsers } from '../../store/reducers/userReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faSort } from '@fortawesome/free-solid-svg-icons';
import './userlist.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [showInputs, setShowInputs] = useState(false);

  const onDelete = (id) => {
    dispatch(deleteUsers(id));
  };

  const onAddNewUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      return;
    }

    dispatch(createUsers(newUser));
    setNewUser({
      name: '',
      email: '',
      phone: '',
    });
    setShowInputs(false);
  };

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      onAddNewUser();
    }
  };

  const onInputChangeHandler = (key, value) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
    if (!showInputs && newUser.name && newUser.email && newUser.phone) {
      onAddNewUser();
    }
  };

  return (
    <div className='content-box'>
      <h1>UserList</h1>
      <FontAwesomeIcon icon={faSort} className='icon' />
      <button className='btn' onClick={toggleInputs}>
          {showInputs ? 'ADD NEW STUDENT' : 'ADD NEW STUDENT'}
        </button>
      <div className='input-block'>
        {showInputs && (
          <>
            <input className='first-input'
              type='text'
              placeholder='Name...'
              value={newUser.name}
              onChange={(e) => onInputChangeHandler('name', e.target.value)}
            />
            <input
             className='second-input'
             type="email"
             placeholder='E-mail...'
             value={newUser.email}
             onChange={(e) => onInputChangeHandler('email', e.target.value)}
/>


            <input className='thrid-input'
              type='Number...'
              placeholder='Phone'
              value={newUser.phone}
              onChange={(e) => onInputChangeHandler('phone', e.target.value)}
              onKeyPress={onKeyPressHandler}
            />
          </>
        )}
        
      </div>
      <hr />
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='content'>
                <td>
                  <img src={`/img/7.jpeg`} alt={`Profile of ${user.name}`} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <FontAwesomeIcon  icon={faPen} style={{ color: 'yellow' }} />
                </td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => onDelete(user.id)}
                    icon={faTrashCan}
                    
                    style={{ color: 'yellow' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;

