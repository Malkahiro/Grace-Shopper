import React, { useState, useEffect } from "react";
import { getUsers } from "../../axios-services";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
        .then((results) => {
            setUsers(results);
            console.log("users", results)
        })
        .catch((error) => console.error(error));
    }, []);
    return (
<div>
<h1>Users</h1>
{users.map((user) => (
    <div className="post-box" key={user.id}>
    <h2 style={{ textDecorationLine: "underline" }}>{user.name}</h2>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
    <p>Address: {user.address}</p>
    </div>
))}
</div>
    )
}
export default Users;