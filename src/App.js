import React, { useState, Fragment } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import CounterWithEffect from './components/CounterWithEffect';

// Hooks basically makes a state that is accessible to other components through props.
// Except you can easily manage state from any linked component.

// Logically, you name the variables that modify hooks are named 'setBanana'

// const [ line, hook ] = useState(bait); 
// The line is how you connect to the the hook
// The hook 
// The bait is what you place on the hook in the beginning


const App = () => {  // Functional component doing cool class component stuff
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]
  const initialFormState = { id: null, name: '', username: '' }
  

  // Users doesn't exist until we create it here, as 'users', 
  // which can be manipulated with setUsers()
  // When you define two objects and assign to useState(), you make the first a variable, and the second a function
  // users becomes a variable   (banana keyword)
  // setUsers() becomes a function that changes 'users' to the argument passed in   (banana keyword)
  // The argument you pass through useState sets the intial assignment to the variable.
  // so, 'users' becomes the value of 'usersData'. Then we have stateful usersData.
  const [ users, setUsers ] = useState(usersData);

  
  // users is stateful users, or users is current state
  // usersData is the initial state only
  const lastUID = users[users.length - 1].id;       
  

  // This is basically 'edit mode'. Creates an 'editing' key in state.  sets it equal to false by default
  // 'editing' is a stateful value
  // setEditing is how you modify it from state
  const [ editing, setEditing ] = useState(false);


  // setEditing and setCurrentUser are toggles as well
  // when setEditing is true, current user is filled. When it's false, current user is clear.
  const [ currentUser, setCurrentUser ] = useState(initialFormState); 


  const addUser = user => {
    user.id = lastUID + 1;
    setUsers([ ...users, user ]) // setUsers taking in the current state and updating it with the current state plus something
  }


  // filter to create an array of everything except the target user. ie: deleteUser(target-user)
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  }


  // editUser is passed to the UserTable and powers the button what toggles the EditUserForm or AddUserForm default.
  // Makes it so every individual user has a button that triggers this function and defines setCurrentUser
  // which we pass to EditUserForm and it can be filled with data.
  const editUser = user => {
    setEditing(true); // editUser is clicked, change editing state to true, bringing up the EditUserForm
    setCurrentUser({
      id:user.id,
      name:user.name,
      username:user.username
    })
  }


  // updateUser is passed to the EditUserForm
  const updateUser = (id, updatedUser) => { 
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user))); // Set users is the users array state
  }

  // console.log(lastUID)
  console.log('This is the currentUser:',currentUser)

  return (
    <Fragment>

      <div className="container">
          <h1>CRUD App with Hooks</h1>
          <div className="flex-row">
          <div className="flex-large">
            {editing ? (  // If the value of editing is true, show the EditUserForm instead of the AddUserForm
              <div>
                <h2>Edit user</h2>
                <EditUserForm
                  editing={editing} // EditUserForm toggle ON
                  setEditing={setEditing} // OFF
                  currentUser={currentUser}   // The editUser function provides this object. Button at UserTable
                  updateUser={updateUser}     // 
                />
              </div>
            ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
          <div className="flex-large">
            <h2>View users</h2>
            <UserTable 
              users={users} 
              deleteUser={deleteUser} 
              editUser={editUser} 
            />
          </div>
          <div className="flex-large">
            <h2>Counter</h2>
            <CounterWithEffect 
              users={users} 
            />
          </div>


        </div>
      </div>

    </Fragment>
  );
}

export default App;
