import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

function Home() {
    const[newUser,setNewuser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
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
    const handleInput = (e) => {
      let isValid = true;
      if(e.target.name === 'email') {
        isValid = /\S+@\S+\.\S+/.test(e.target.value) && e.target.value !== '';
      }
      if(e.target.name === 'password') {
        isValid = /d{1}/.test(e.target.value) && e.target.value !== '';
      }
      if(isValid) {
        const anewUser = {...user};
        anewUser[e.target.name] = e.target.value;
        setUser(anewUser);
        console.log(isValid);
      }else {
        console.log('somthing went wrong')
      }
    }

    const updateName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log(`Update successful.`)
        }).catch(function(error) {
          console.log('An error happened.')
        });
    }
    const handleSubmit = (e) => {
      if(!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          console.log(res);
        })
        .catch(function(error) {
          const newUserInfo = {...user};
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
      }
      
      if(newUser && user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateName(user.name);
        })
        .catch(error => {
          const newUserInfo = {...user};
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
      }

      e.preventDefault();
    }
    return (
        <div className='text-center container'>
            <div>
                { user.isSignIn && 
                    <div>
                        <h2>Welcome {user.name}</h2> 
                        <p>Email: {user.email}</p> <br></br>
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
            <br></br> <br></br>
            <div className="">
              <p style={{color: 'red'}}>{user.error}</p>
              {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Login'} successfully</p>}
              <form onSubmit={handleSubmit}>
                  <input type="checkbox" onChange={() =>{setNewuser(!newUser)}} name="newuser" id=""/>
                  <label htmlFor="newuser"> New User</label>
                  {newUser && <input type="text" name='name' onBlur={handleInput} className='form-control' placeholder='Name'/> }
                  <input type="email" name='email' onBlur={handleInput} className='form-control' placeholder='Email'/> 
                  <input type="password" name='password' onBlur={handleInput} className='form-control' placeholder='Password'/> 
                  <input type="submit" value={newUser ? 'SignUp' : 'Login'} />
              </form>

            </div>
        </div>
    )
}

export default Home;
