import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loadUsers = useLoaderData();
    const [users, setUsers] = useState(loadUsers);

    const handleDelete = _id => {
        console.log('Delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Deleted successfully');
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining);
                }
            })
    }
    return (
        <div>
            <h2>{users.length}</h2>
            {
                users.map(user =>
                    <p key={user._id}> {user._id}
                        {user.name} : {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)}>X</button>
                    </p>)
            }
        </div>
    );
};

export default Users;