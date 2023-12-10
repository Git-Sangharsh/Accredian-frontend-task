import React from 'react'
import { Link } from 'react-router-dom';

const Succesful = () => {
  return (
    <div>
        <h1>Sign Up or Sign In Successfull</h1>
        <Link to={'/'}>

        <button>SignUp</button>
        </Link>
        <Link to={'/signin'}>

        <button>Signin</button>
        </Link>
    </div>
  )
}

export default Succesful