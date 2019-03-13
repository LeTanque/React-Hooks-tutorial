import React, { useState, useEffect, Fragment } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import CounterWithEffect from './components/CounterWithEffect';


// Hooks basically makes a state that is accessible to other components through props.
// Except you can easily manage state from any linked component.


// const [ viewState, setState ] = useState(initialState); 
// This is a hook
// initialState can be pretty much anything
// setState is going to be a function that you pass the new state into. setState(newState)
// viewState is the latest state of the hook. Will be stateful when passed to other components

// const [ state, function ] = useState(const);   // Another way to deconstruct a hook
// onClick={function(Y)}
// Now the state becomes Y


const App = () => {  // Functional component doing cool class component-like state stuff
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette', score:0 },
    { id: 2, name: 'Craig', username: 'siliconeidolon', score:0 },
    { id: 3, name: 'Ben', username: 'benisphere', score:0 },
  ]
  const initialFormState = { id: null, name: '', username: '', score:0 };
  

  // Users doesn't exist until we create it here, as 'users', 
  // which can be manipulated with setUsers()
  // When you define two objects and assign to useState(), you make the first a variable, and the second a function
  // users becomes a variable   (banana keyword)
  // setUsers() becomes a function that changes 'users' to the argument passed in   (banana keyword)
  // The argument you pass through useState sets the intial assignment to the variable.
  // so, 'users' becomes the value of 'usersData'. Then we have stateful usersData.
  const [ users, setUsers ] = useState(usersData);

  
  // This is basically 'edit mode'. Creates an 'editing' key in state.  sets it equal to false by default
  // 'editing' is a stateful value
  // setEditing is how you modify it from state
  const [ editing, setEditing ] = useState(false);


  // This is a hook. Starts set to 0, modified with setCount, state viewed from count
  const [ count, setCount ] = useState(0);


  // setEditing and setCurrentUser are toggles as well
  // when setEditing is true, current user is filled. When it's false, current user is clear.
  const [ currentUser, setCurrentUser ] = useState(initialFormState); 


  // Hook for user's personal counts
  const [ userScore, setUserScore ] = useState(0);


  // Maybe not something would create on a production site, or maybe yes. 
  // React dev tools don't provide much detail about hook state at each component
  // Not from tutorial
  // const currentState = [users,editing,currentUser];
  // Complicated this as a console.log that saves a few clicks
  

  // users is current state of users
  // But, usersData is the initial state only. Don't modify the source supply.
  // Not from tutorial
  const lastUID = users[users.length - 1].id;       
  

  const addUser = user => {
    user.id = lastUID + 1;
    setUsers([ ...users, user ]) // setUsers hook taking in the current state and updating it with the current state plus something
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
      username:user.username,
      score:user.score,
    })
  }


  // updateUser is passed to the EditUserForm
  const updateUser = (id, updatedUser) => { 
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user))); // Set users is the users array state
  }

  // console.log(lastUID)
  // console.log('This is the currentUser:',currentUser) // currentUser is in the currentState of App
  console.log(`This is the currentState`,
    `\nusers:`,users,
    `\nediting:`,editing,
    `\ncurrentUser:`,currentUser,
    `\ncount:`,count,
    `\nuserScore:`,userScore,
  )


  // const oldScore = () => {
  //   props.users.filter(user=>user.id===props.currentUser.id);
  //   console.log(oldScore.score)
  // }

  useEffect(() => {
    currentUser.score = userScore
  })


  return (
    <Fragment>

      <div className="container">
          <h1>CRUD App with Hooks</h1>
          <div className="flex-row">
          <div className="flex-large">
            {editing ? (  // If the value of editing is true, show the EditUserForm instead of the AddUserForm
              <Fragment>
                <h2>Edit user</h2>
                <EditUserForm
                  editing={editing} // EditUserForm toggle ON
                  setEditing={setEditing} // OFF
                  currentUser={currentUser}   // The editUser function provides this object. Button at UserTable
                  updateUser={updateUser}     // 
                />
              </Fragment>
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
            <h2>Score</h2>
            <CounterWithEffect 
              users={users}
              currentUser={currentUser}
              editing={editing}
              count={count}
              setCount={setCount}
              userScore={userScore}
              setUserScore={setUserScore}
            />
          </div>


        </div>
      </div>

    </Fragment>
  );
}

export default App;
