import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState ([])

    useEffect (() => {
        axios.get("http://localhost:3001")
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
            .then(res => {
                console.log(res);
                window.location.reload(); // Add parentheses to invoke the function
            })
            .catch(err => console.log(err)); // Fix the typo here, change errr to err
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="shadow w-50 bg-white rounded p-3">
                <h1 className="text-center p-4 mb-4">Mern Stack - Crud</h1>
                <Link to="/create" className="btn btn-success">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-primary mx-2">Update</Link>
                                        <button className="btn btn-danger mx-2" onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Users;