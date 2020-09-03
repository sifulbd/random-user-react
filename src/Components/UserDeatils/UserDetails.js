import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';


function UserDetails() {
    const [us, setSingleuser] = useState({});
    let { keyId } = useParams();

    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/users/${keyId}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setSingleuser(data))
        .catch(error => console.log(error))
    }, []);

    // const {name, catchPhrase, bs} = us.company;
    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">{us.name}</h1>
                    <p className="lead">{us.email}</p>
                    <p className="lead">{us.phone}</p>

                    <ul className="list-group">
                        <li className="list-group-item">Company : {us?.company?.name}</li>
                        <li className="list-group-item">Company Type: {us?.company?.catchPhrase}</li>
                        <li className="list-group-item">Best in: {us?.company?.bs}</li>
                    </ul>
                    <Link to='/' className="lead"> Website: {us.website} </Link>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;
