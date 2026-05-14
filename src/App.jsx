import { useState } from 'react'
import UserCard from './UserCard'

function App() {
    const [users, setUsers] = useState([
        { id: 1, name: "Dhiraj", age: 21, city: "Mumbai", isActive: true },
        { id: 2, name: "Ram", age: 25, city: "Delhi", isActive: false }
    ]);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            id: users.length + 1,
            name: name,
            age: Number(age),
            city: city,
            isActive: true
        };

        setUsers([...users, newUser]);

        setName("");
        setAge("");
        setCity("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>

            {users.map(user => <UserCard key={user.id} {...user} />)}
        </>
    );
}

export default App