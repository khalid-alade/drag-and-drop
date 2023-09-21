import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import App from '../../App';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signOutError, setsignOutError] = useState('')
  const [authUser, setAuthUser] = useState(null)


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    return () => {
      listen();
    }

  }, [])

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('sign out successful')
    }).catch((error) => {
      console.log(error)
      setsignOutError('Check your network connection')
    })
  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }


  const signIn = (e) => {
    document.querySelector('.spinneer').style.display = 'flex';
    console.log('spineer')
    clearErrors()
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .then(() => {
        clearInputs()
        document.querySelector('.spinneer').style.display = 'none';
      })
      .catch((error) => {
        clearInputs()

        document.querySelector('.spinneer').style.display = 'none';
        console.log(error)
        switch (error.code) {
          case 'auth/network-request-failed':
            setEmailError('Check your network connection')
            break;
          case 'auth/invalid-email':
            setEmailError('Enter email')
            break;
          case 'auth/invalid-login-credentials':
            setEmailError('Wrong email or password')
            break;
          case 'auth/user-disabled':
            setEmailError('This user has been disabled')
            break;
          case 'auth/user-not-found':
            setEmailError('This user has no account')
            break;
          case 'auth/wrong-password':
            setEmailError('wrong password')
            break;
          case 'auth/missing-password':
            setPasswordError('Enter password');
            break;
          default:
            setEmailError('')

        }
      })
  }

  return (
    <div className='App'>
      {authUser ? <App authUser={authUser} signOutError={signOutError} userSignOut={userSignOut} />
        :
        <div className='inwrapper'>
          <form onSubmit={signIn}>

            <div className='spinneer'>
              <div className='spin'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
              </div>
            </div>

            <h1 className='inlog'>Login</h1>

            <div className='inner'>

              <div className='boxx1'>
                <input className='uname' type='email' placeholder='Enter email ( user@example.com )' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <p className='label'>{emailError}</p>
              </div>

              <div className='boxx2'>
                <input className='password' type='password' placeholder='Enter password ( 1Password )' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <p className='label'>{passwordError}</p>
              </div>

              <button type='submit'>LOG IN</button>

            </div>
          </form>
        </div>
      }
    </div>
  );
}
