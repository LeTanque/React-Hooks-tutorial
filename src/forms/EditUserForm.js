import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
	const [ user, setCurrentUser ] = useState(props.currentUser)

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCurrentUser({ ...user, [name]: value })
	}


    // useEffect Effect Hook lets you perform side effects in function components:
    useEffect(() => {
            setCurrentUser(props.currentUser)
        },
        [ props ]
    )

    console.log('EditUserForm props:',props);

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				props.updateUser(user.id, user)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Username</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Update user</button>
			<button onClick={() => props.setEditing(false)} className="button muted-button">
				Cancel
			</button>
		</form>
	)
}

export default EditUserForm