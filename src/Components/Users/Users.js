import React,{useState, useEffect} from 'react';
import Singleuser from '../User/Singleuser';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error))
    }, []); 

    return (
        <div>
            <h2 className="text-primary">Premium User List</h2>
            <div className="container">
                <div className="row">
                    {
                        users.map(fr => 
                            <Singleuser key={fr.id} id={fr.id} name={fr.name} email={fr.email} phone={fr.phone} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Users;
