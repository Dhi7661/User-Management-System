import React from 'react'

const Greeting = ({isLoggedIn}) => {
  return (
    <div>
        {isLoggedIn ? "welcome back" : "Log in"}
    </div>
    

  )
}

export default Greeting