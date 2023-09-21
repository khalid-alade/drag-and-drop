import React from 'react';

export default function LogOff(props) {
  return (
    <div className='logoff'>

      <p className='inas'>Signed in as {props.authUser.email}</p>
      <div className='logofflink' onClick={props.userSignOut}>logout</div>
      <p className='inas2'>{props.signOutError}</p>
    </div>
  );
}
