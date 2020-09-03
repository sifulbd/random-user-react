import React from 'react'
import { Link } from 'react-router-dom';
function Singleuser({id, name, email, phone}) {
    return (
        <div className='col-md-4'>
            <div className="card">
            <div className="card-body"><h5>{name}</h5>
                <p className="card-text">{email}</p>
                <p className="card-text">{phone}</p>
                <Link className='btn btn-danger' to={`/user/${id}`}>View More</Link>
            </div>
            </div>
        </div>
    )
}

export default Singleuser;
