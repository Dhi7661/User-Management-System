import React from 'react'

const UserCard = (props) => {
    return (
        <div>
            <p>My name is {props.name}, age is {props.age}, I live in {props.city} status - {props.isActive ? "online" : "offline"} </p>
            <button onClick={props.onToggle}>
                {props.isActive ? "Set Offline" : "Set Online"}
            </button>
            <button onClick= {props.onDelete}> Delete</button>

            <ul>

            </ul>

        </div>
    )
}

export default UserCard