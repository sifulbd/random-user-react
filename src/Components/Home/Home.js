import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

function Home() {
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
      })
     
      const handleClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider)
        .then( res => {
          const{displayName, email, photoURL} = res.user;
          const signInUser = {
            isSignIn: true,
            name: displayName, 
            email: email,
            photo: photoURL,
          };
          setUser(signInUser);
        })
        .catch(err => console.log(err));
      }

      const handleSignOut = () => {
        firebase.auth().signOut().then(function() {
          const usersignOut = {
            isSignIn: false,
            name: '',
            email: '',
            photo: '',
          }
          setUser(usersignOut);
        }).catch(function(error) {
          // An error happened.
        });
      }
    return (
        <div className='text-center'>
            <div>
                { user.isSignIn && 
                    <div>
                        <h2>Welcome {user.name}</h2> 
                        <p>Email: {user.email}</p>
                        <img src={user.photo} alt={user.name}/>
                    </div>
                }
                <br />
                {
                  user.isSignIn ? 
                  <button onClick={handleSignOut}> Sign Out </button> : 
                  <button onClick={handleClick}> Sign In </button> 
                }
                 <br />
            </div>
        </div>
    )
}

export default Home;
