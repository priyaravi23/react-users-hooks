import React, { useState, Fragment } from 'react'
import AddUserForm from './components/form/add-user-form'
import EditUserForm from './components/form/edit-user-form'
import UserTable from './components/table/user-table'

const App = () => {
    // Data
    const usersData = [
        { id: 1, name: 'Priya', username: 'pppRavi' },
        { id: 2, name: 'Rohit', username: 'rV1990' },
        { id: 3, name: 'Caesar', username: 'Caes06' },
    ];

    const initialFormState = { id: null, name: '', username: '' };

    // Setting state
    const [ users, setUsers ] = useState(usersData);
    const [ currentUser, setCurrentUser ] = useState(initialFormState);
    const [ editing, setEditing ] = useState(false);

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1;
        setUsers([ ...users, user ])
    };

    const deleteUser = id => {
        setEditing(false);

        setUsers(users.filter(user => user.id !== id))
    };

    const updateUser = (id, updatedUser) => {
        setEditing(false);

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    };

    const editRow = user => {
        setEditing(true);

        setCurrentUser({ id: user.id, name: user.name, username: user.username })
    };

    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add user</h2>
                            <AddUserForm addUser={addUser} />
                        </Fragment>
                    )}
                </div>
                <div className="flex-large">
                    <h2>View users</h2>
                    <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
                </div>
            </div>
        </div>
    )
};

export default App