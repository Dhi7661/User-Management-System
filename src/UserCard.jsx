import React from 'react'

const UserCard = (props) => {
    return (
        <div>
            <p>My name is {props.name}, age is {props.age}, I live in {props.city} status - {props.isActive ? "online" : "offline"} </p>

            <ul>
                
            </ul>

        </div>
    )
}

export default UserCard