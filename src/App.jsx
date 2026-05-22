import { useState, useEffect } from 'react';
import UserCard from './UserCard';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");  // ✅ Add error state

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Fetch error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // ✅ Clear previous errors

        // ✅ Frontend validation
        if (!name || !age || !city) {
            setError("All fields are required!");
            return;  // ❌ Stop here
        }

        if (age < 0 || age > 100) {
            setError("Age must be between 0 and 100!");
            return;  // ❌ Stop here
        }

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, age: Number(age), city })
            });

            // ✅ Check if backend returned error
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const newUser = await response.json();
            setUsers([...users, newUser]);

            // ✅ Clear form
            setName("");
            setAge("");
            setCity("");
        } catch (err) {
            setError("Failed to add user!");
            console.error(err);
        }
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "DELETE"
        });
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleStatus = async (id) => {
        const user = users.find(u => u.id === id);
        const updatedUser = { ...user, isActive: !user.isActive };

        await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        setUsers(users.map(u => u.id === id ? updatedUser : u));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* ✅ Show error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

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

            {users.map(user => (
                <UserCard
                    key={user.id}
                    {...user}
                    onToggle={() => toggleStatus(user.id)}
                    onDelete={() => deleteUser(user.id)}
                />
            ))}
        </>
    );
}

export default App;