import React, { Fragment } from 'react'




const UserTable = props => {

    // console.log('UserTable \nprops:',props);

    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.length > 0 ? (
                        props.users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.score}</td>
                                <td>
                                    <button className="button muted-button" onClick={() => {props.editUser(user)}}>
                                        Edit
                                    </button>
                                    <button className="button muted-button" onClick={() => props.deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No users</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}


export default UserTable